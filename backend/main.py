from fastapi import FastAPI
from routes.base import router as base_router

app = FastAPI()

# Include route groups
app.include_router(base_router)
