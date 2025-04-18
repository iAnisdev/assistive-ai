from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

class CaptionModel:
    def __init__(self):
        self.processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base" , use_fast=True)
        self.model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
        self.model.eval()

    def generate_caption(self, image: Image.Image) -> str:  
        inputs = self.processor(images=image, return_tensors="pt")
        output = self.model.generate(**inputs, max_length=50)
        caption = self.processor.decode(output[0], skip_special_tokens=True)
        return caption
