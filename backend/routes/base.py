from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def welcome():
    return {"message": "Welcome to Assistive AI"}

@router.get("/health")
def health():
    return {"status": "ok"}
