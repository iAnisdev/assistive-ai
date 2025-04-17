# Accept image from user multipart/form-data
from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io

router = APIRouter()

@router.post("/upload")

async def upload_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")

        # TODO: send image to model pipeline
        result = {
            "label": "placeholder-object",
            "confidence": 0.95
        }

        return {"label": "Thank you for uploading the image, the AI is working on it and will return the result shortly"}
    except Exception as e:
        return {"error": str(e)}