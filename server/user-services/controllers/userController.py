from fastapi import HTTPException, Depends,status, Request, Response, BackgroundTasks
from database.connection import database
from config.settings import settings
from utils.auth import hash_password
from models.userModel import UserModel
from utils.send_mail import send_email
from datetime import datetime, timedelta, timezone
from bson import ObjectId
import secrets

# ========================================== Helper Function ================================================
def convert_objectid(data):
    if isinstance(data, list):
        return [convert_objectid(i) for i in data]
    if isinstance(data, dict):
        return {k: convert_objectid(v) for k, v in data.items()}
    if isinstance(data, ObjectId):
        return str(data)
    return data

# ========================================== User Register ======================================
async def register_user(user, response: Response, background_tasks: BackgroundTasks):
    email = user.email.strip().lower()
    phone = user.phone.strip()
    
    existing_user = await database.db["users"].find_one({"$or": [{"email": email}, {"phone": phone}]})
    if existing_user:
        if existing_user["email"] == email:
            raise HTTPException(status_code=400, detail="Email already registered")
        if existing_user["phone"] == phone:
            raise HTTPException(status_code=400, detail="Phone number already registered")
    
    temp_user = await database.db["temp_users"].find_one({"$or": [{"email": email}, {"phone": phone}]})
    if temp_user:
        raise HTTPException(status_code=400, detail="User already registered. Please verify OTP.")
    
    user_dict = UserModel(**user.dict())
    user_dict.email = email
    user_dict.phone = phone
    user_dict.password = hash_password(user.password)
    user_dict.isAccountVerified = False
    
    IST = timezone(timedelta(hours=5, minutes=30))
    now_ts = int(datetime.now(IST).timestamp())

    user_dict.createdAt = now_ts
    user_dict.updatedAt = now_ts
    
    await database.db["temp_users"].insert_one(user_dict.dict())
    
    await send_otp_verification(email=email,background_tasks=background_tasks)
    
    return {"msg": "Registration successful. OTP sent to your email."}

# ============================================== Send OTP ===========================================
async def send_otp_verification(email: str, background_tasks: BackgroundTasks):
    email = email.strip().lower()
    temp_user = await database.db["temp_users"].find_one({"email": email})
    if not temp_user or temp_user.get("isAccountVerified"):
        raise HTTPException(status_code=404, detail="User not found or already verified")

    last_sent = temp_user.get("lastOtpSentAt", 0)
    now_ts = int(datetime.now().timestamp())
    if now_ts - last_sent < settings.RESEND_COOLDOWN:
        raise HTTPException(
            status_code=429,
            detail=f"Please wait {settings.RESEND_COOLDOWN} seconds before resending OTP."
        )

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
        message=f"""
Hi {temp_user['name']},

Your OTP to verify your email is: {otp}
This OTP is valid for 5 minutes. Please do not share it with anyone.

- RideX Team
"""
    )
    return {
    "message": f"✅ OTP has been sent successfully to {email}.",
    "cooldown_seconds": settings.RESEND_COOLDOWN
}


