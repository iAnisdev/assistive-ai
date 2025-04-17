from fastapi import FastAPI
from routes.base import router as base_router
from routes.upload import router as upload_router
app = FastAPI()

# Include route groups
app.include_router(base_router)
app.include_router(upload_router)