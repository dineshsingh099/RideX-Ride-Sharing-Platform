from pydantic import BaseModel, EmailStr

class UserModel(BaseModel):
    name: str
    email: EmailStr
    number: str
    password: str
    verifyOtp: str = " "
    verifyOtpExpireAt: int = 0
    isAccountVerified: bool = False
    resetOtp: str = " "
    resetOtpExpireAt: int = 0
    createdAt: int = 0       
    updatedAt: int = 0
