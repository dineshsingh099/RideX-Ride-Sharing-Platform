from fastapi import APIRouter, Response, Request, BackgroundTasks, Depends
from schemas.userSchemas import UserCreate
from controllers import userController

router = APIRouter(prefix="/users", tags=["Users"])

# ---------------- Register ----------------
@router.post("/register")
async def register(user: UserCreate, response: Response, background_tasks: BackgroundTasks):
    return await userController.register_user(user, response, background_tasks)

