from fastapi import APIRouter, Response, BackgroundTasks, Depends
from schemas.userSchemas import UserCreate, OTPVerifySchema, UserLogin
from controllers.userController import register_user,verify_email_otp,login_user,protected_route,logout_user
from dependencies.user import get_current_user


router = APIRouter(prefix="/users", tags=["Users"])

#======Register Route=================
@router.post("/register")
async def register_route(user: UserCreate, background_tasks: BackgroundTasks):
    return await register_user(user, background_tasks)

#======Verify OTP Route=================
@router.post("/verify-email-otp")
async def verify_otp_route(data: OTPVerifySchema, response: Response, background_tasks: BackgroundTasks):
    return await verify_email_otp(data.email, data.otp, response, background_tasks)

#======Login Route=================
@router.post("/login")
async def login_route(user: UserLogin, response: Response):
    return await login_user(user, response)

#======Protected Route=================
@router.get("/protected")
async def protected_route_route(current_user=Depends(get_current_user)):
    return await protected_route(current_user)
    
@router.post("/logout")
async def logout(response: Response):
    return await logout_user(response)