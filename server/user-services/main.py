from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.connection import database
from routes.userRoutes import router as user_router

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    await database.connect()  

@app.on_event("shutdown")
async def shutdown_event():
    await database.close()

app.include_router(user_router)
