import re

def validate_phone(phone: str) -> str:
    pattern = r"^[6-9]\d{9}$"
    if not re.match(pattern, phone):
        raise ValueError("Invalid phone number. Must be 10 digits.")
    return phone

def validate_password(password: str) -> str:
    password = password.strip()
    errors = []
    
    if len(password) < 8:
        errors.append("Password must be at least 8 characters long")
    if len(password) > 128:
        errors.append("Password must be at most 128 characters long")
    if not re.search(r"[A-Z]", password):
        errors.append("Password must contain at least one uppercase letter")
    if not re.search(r"[a-z]", password):
        errors.append("Password must contain at least one lowercase letter")
    if not re.search(r"\d", password):
        errors.append("Password must contain at least one number")
    if not re.search(r"[!@#$%^&*(),.?\":{}|<>]", password):
        errors.append("Password must contain at least one special character")
    if errors:
        raise ValueError(errors)   
    
    return password
