from fastapi import Response, BackgroundTasks, HTTPException, Depends
from database.connection import database
from config.settings import settings
from utils.auth import hash_password, create_access_token, verify_password
from utils.send_mail import send_email
from models.userModel import UserModel
from dependencies.user import get_current_user
from bson import ObjectId
from datetime import datetime, timedelta, timezone
import secrets

def convert_objectid(data):
    if isinstance(data, list):
        return [convert_objectid(i) for i in data]
    if isinstance(data, dict):
        return {k: convert_objectid(v) for k, v in data.items()}
    if isinstance(data, ObjectId):
        return str(data)
    return data

#======Register Function=================
async def register_user(user, background_tasks: BackgroundTasks):
    email = user.email.strip().lower()
    number = user.number.strip()
    
    existing_user = await database.db["users"].find_one({"$or": [{"email": email}, {"number": number}]})
    if existing_user:
        if existing_user["email"] == email:
            raise HTTPException(status_code=400, detail="Email already registered")
        if existing_user["number"] == number:
            raise HTTPException(status_code=400, detail="Phone Number already registered")
            
    temp_user = await database.db["temp_users"].find_one({"$or": [{"email": email}, {"number": number}]})
    if temp_user:
        raise HTTPException(status_code=400, detail="User already registered. Please verify OTP.")
        
    user_dict = UserModel(**user.dict())
    user_dict.email = email
    user_dict.number = number
    user_dict.password = hash_password(user.password)
    user_dict.isAccountVerified = False
    
    IST = timezone(timedelta(hours=5, minutes=30))
    now_ts = int(datetime.now(IST).timestamp())
    user_dict.createdAt = now_ts
    user_dict.updatedAt = now_ts
    
    await database.db["temp_users"].insert_one(user_dict.dict())
    await send_otp_verification(email=email, background_tasks=background_tasks)
    
    return {
        "msg": "Registration successful. OTP sent to your email.",
        "user": {"email":email,"name": user_dict.name}
    }

#======Send OTP Function=================
async def send_otp_verification(email: str, background_tasks: BackgroundTasks):
    email = email.strip().lower()
    temp_user = await database.db["temp_users"].find_one({"email": email})
    if not temp_user or temp_user.get("isAccountVerified"):
        raise HTTPException(status_code=404, detail="User not found or already verified")

    last_sent = temp_user.get("lastOtpSentAt", 0)
    now_ts = int(datetime.now().timestamp())
    if now_ts - last_sent < settings.RESEND_COOLDOWN:
        raise HTTPException(status_code=429, detail=f"Please wait {settings.RESEND_COOLDOWN} seconds before resending OTP.")

    otp = str(secrets.randbelow(1000000)).zfill(6)
    otp_expire = now_ts + 300

    await database.db["temp_users"].update_one(
        {"email": email},
        {"$set": {
            "verifyOtp": hash_password(otp),
            "verifyOtpExpireAt": otp_expire,
            "otpAttempts": 0,
            "lastOtpSentAt": now_ts
        }}
    )

    background_tasks.add_task(
        send_email,
        to_email=email,
        subject="RideX Email Verification OTP",
        message=f"Your OTP to verify your email is: {otp}\nValid for 5 minutes."
    )
    return {"message": f"OTP sent to {email}", "cooldown_seconds": settings.RESEND_COOLDOWN}

#======Verify OTP Function=================
async def verify_email_otp(email: str, otp: str, response: Response, background_tasks: BackgroundTasks):
    email = email.strip().lower()
    temp_user = await database.db["temp_users"].find_one({"email": email})
    if not temp_user:
        raise HTTPException(status_code=404, detail="User not found")

    now_ts = int(datetime.now().timestamp())
    if now_ts > temp_user.get("verifyOtpExpireAt", 0):
        raise HTTPException(status_code=400, detail="OTP expired")

    otp_attempts = temp_user.get("otpAttempts", 0)
    if otp_attempts >= settings.MAX_OTP_ATTEMPTS:
        raise HTTPException(status_code=429, detail="Maximum OTP attempts exceeded")

    if not verify_password(otp, temp_user.get("verifyOtp", "")):
        await database.db["temp_users"].update_one({"email": email}, {"$inc": {"otpAttempts": 1}})
        remaining = settings.MAX_OTP_ATTEMPTS - (otp_attempts + 1)
        raise HTTPException(status_code=400, detail=f"Invalid OTP. {remaining} attempts left.")

    await database.db["temp_users"].update_one(
        {"email": email},
        {"$set": {
            "isAccountVerified": True,
            "verifyOtp": None,
            "verifyOtpExpireAt": 0,
            "updatedAt": now_ts
        }}
    )

    verified_user = await database.db["temp_users"].find_one({"email": email})
    await database.db["users"].insert_one(verified_user)
    await database.db["temp_users"].delete_one({"email": email})

    token = create_access_token(data={"sub": str(verified_user["_id"])}, expires_delta=timedelta(minutes=60))
    response.set_cookie(key="token", value=token, httponly=True, secure=settings.is_production, samesite="strict", max_age=7*24*60*60)

    return {"msg": "Email verified successfully and logged in"}

#======Login Function=================
async def login_user(user, response: Response):
    email = user.email.strip().lower()
    db_user = await database.db["users"].find_one({"email": email})
    if not db_user or not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not db_user["isAccountVerified"]:
        raise HTTPException(status_code=401, detail="Email not verified")

    token = create_access_token(data={"sub": str(db_user["_id"])}, expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES))
    response.set_cookie(key="token", value=token, httponly=True, secure=False, samesite="lax", max_age=7*24*60*60,path="/")

    return {
        "msg": "Login successful", 
        "user": {"email": db_user["email"], "name": db_user["name"]}
    }
    
#======Protected Route Function=================
async def protected_route(current_user: dict = Depends(get_current_user)):
    return {
        "msg": "User fetched successfully",
        "user": {
            "name": current_user.get("name"),
            "email": current_user.get("email"),
        }
    }
    
#======Logout Function=================
async def logout_user(response: Response):
    response.delete_cookie(
        key="token",
        path="/"
    )
    return {"msg": "Logout successful"}
