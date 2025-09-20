from pydantic import BaseModel, EmailStr, validator
from validators.validations import validate_phone, validate_password
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    password: str
    
    @validator("phone")
    def phone_validation(cls, v):
        return validate_phone(v)
        
    @validator("password")
    def password_validation(cls, v):
        return validate_password(v)
        
class UserResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    phone: str
    isAccountVerified: bool = False

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
class EmailSchema(BaseModel):
    email: EmailStr

class OTPVerifySchema(BaseModel):
    email: EmailStr
    otp: str
    
    
class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
