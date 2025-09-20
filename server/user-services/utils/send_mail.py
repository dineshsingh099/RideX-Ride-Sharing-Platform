from fastapi_mail import MessageSchema
from config.email_config import fm

async def send_email(to_email: str, subject: str, message: str):
    try:
        msg = MessageSchema(
            subject=subject,
            recipients=[to_email],
            body=message,
            subtype="plain",
        )
        await fm.send_message(msg)
        print("✅ Email sent successfully")
    except Exception as e:
        print(f"❌ Error sending email: {e}")
