from database.connection import database
from datetime import datetime, timedelta

#----------------------Get Blacklist Collection----------------------
def Blacklist_Collection():
    return database.db["blacklisted_tokens"]

#----------------------Check if Token is Blacklisted----------------------
async def is_blacklisted(token: str) -> bool:
    collection = Blacklist_Collection()
    blacklisted = await collection.find_one({"token": token})
    
    return blacklisted is not None

#----------------------Add Token to Blacklist----------------------
async def blacklist_token(token: str, expires_in: int = 7*24*60*60):
    collection = Blacklist_Collection()
    expire_at = int(datetime.now().timestamp()) + expires_in
    await collection.insert_one({
        "token": token,
        "expireAt": expire_at
    })


