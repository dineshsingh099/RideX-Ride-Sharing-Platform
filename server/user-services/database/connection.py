from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

class ConnectDB:
    def __init__(self):
        self.client: AsyncIOMotorClient | None = None
        self.db = None

    async def connect(self):
        self.client = AsyncIOMotorClient(settings.DATABASE_URL)
        self.db = self.client[settings.DB_NAME]
        return self.db

    async def close(self):
        if self.client:
            self.client.close()

database = ConnectDB()
