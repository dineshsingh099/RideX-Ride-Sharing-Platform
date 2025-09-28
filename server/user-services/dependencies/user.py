from fastapi import Request, HTTPException, status
from database.connection import database
from bson import ObjectId
from utils.auth import verify_token

#======Get Current User from JWT Cookie=================
async def get_current_user(request: Request):
    token = request.cookies.get("token")
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated. Token missing")

    user_id = verify_token(token)  

    user = await database.db["users"].find_one({"_id": ObjectId(user_id)})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
