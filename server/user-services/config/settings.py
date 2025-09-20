import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    def __init__(self):
        self.HOST: str = os.getenv("HOST")
        self.PORT: int = int(os.getenv("PORT", 8000))
        self.DATABASE_URL: str = os.getenv("DATABASE_URL")
        self.DB_NAME: str = os.getenv("DB_NAME")
        self.SECRET_KEY = os.getenv("SECRET_KEY")
        self.ALGORITHM = os.getenv("ALGORITHM")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))
        self.NODE_ENV = os.getenv("NODE_ENV", "development")
        self.RESEND_COOLDOWN = int(os.getenv("RESEND_COOLDOWN"))
        self.MAX_OTP_ATTEMPTS = int(os.getenv("MAX_OTP_ATTEMPTS"))
        
        self.MAIL_USERNAME = os.getenv("MAIL_USERNAME")
        self.MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")
        self.MAIL_FROM = os.getenv("MAIL_FROM")
        self.MAIL_PORT = int(os.getenv("MAIL_PORT"))
        self.MAIL_SERVER = os.getenv("MAIL_SERVER")
        self.MAIL_STARTTLS = os.getenv("MAIL_STARTTLS", "True") == "True"
        self.MAIL_SSL_TLS = os.getenv("MAIL_SSL_TLS", "False") == "True"
        self.USE_CREDENTIALS = os.getenv("USE_CREDENTIALS", "True") == "True"
        self.VALIDATE_CERTS = os.getenv("VALIDATE_CERTS", "True") == "True"
        self.MAIL_FROM_NAME = os.getenv("MAIL_FROM_NAME")
        
    @property
    def is_production(self) -> bool:
        return self.NODE_ENV.lower() == "production"

settings = Settings()
