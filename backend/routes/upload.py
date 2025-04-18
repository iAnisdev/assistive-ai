# Accept image from user multipart/form-data
from fastapi import APIRouter, UploadFile, File
from PIL import Image
import io

from models.clip_model import CLIPModel
from models.caption_model import CaptionModel
from utils.nlp import extract_labels


router = APIRouter()

clip = CLIPModel()
captioner = CaptionModel()

@router.post("/upload")

async def upload_image(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents)).convert("RGB")
        print("Image received successfully --->" , image)
        # Step 1: Generate caption
        caption = captioner.generate_caption(image)
        print("Caption generated successfully --->" , caption)
        # Step 2: Extract keywords from caption
        labels = extract_labels(caption)
        print("Labels extracted successfully --->" , labels)
        if not labels:
            labels = ["object"]

        # Step 3: Run CLIP prediction
        result = clip.predict(image, labels)
        print("CLIP prediction completed successfully --->" , result)

        label = result["label"]
        confidence = round(result["confidence"] * 100, 2)

        response_text = (
            f"According to the system, this image most likely shows '{label}', "
            f"with a confidence of {confidence} percent. "
            f"The original scene was described as: '{caption}'. "
            f"From this, the system extracted the keywords: {', '.join(labels)}."
        )

        return {
            "label": label,
            "confidence": confidence,
            "caption": caption,
            "used_labels": labels,
            "message": response_text
        }
    except Exception as e:
        return {"error": str(e)}