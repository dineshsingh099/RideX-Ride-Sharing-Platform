import uvicorn
from config.settings import settings

if __name__ == "__main__":
    print(f"Server listening on port: cd{settings.PORT}")
    uvicorn.run("main:app", host=settings.HOST, port=settings.PORT, reload=True)
