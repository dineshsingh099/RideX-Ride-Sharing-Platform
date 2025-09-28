import asyncio
import logging
from fastapi import HTTPException
from fastapi_mail import MessageSchema, MessageType
from config.email_config import fm

logger = logging.getLogger(__name__)

async def send_email(to_email: str, subject: str, message: str):
    msg = MessageSchema(
        subject=subject,
        recipients=[to_email],
        body=message,
        subtype=MessageType.plain,
    )
    for attempt in range(3):
        try:
            await fm.send_message(msg)
            logger.info(f"✅ Email sent successfully to {to_email}")
            return True
        except Exception as e:
            logger.error(f"❌ Attempt {attempt+1} - Error sending email: {e}")
            if attempt < 2:
                await asyncio.sleep(2)
            else:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to send email. Please try again later."
                )
