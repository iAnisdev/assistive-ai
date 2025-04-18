import open_clip
import torch
from PIL import Image

class CLIPModel:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            'ViT-B-32', pretrained='laion2b_s34b_b79k'
        )
        self.tokenizer = open_clip.get_tokenizer('ViT-B-32')
        self.model.to(self.device)
        self.model.eval()

    def predict(self, image: Image.Image, labels: list[str]) -> dict:
        image_tensor = self.preprocess(image).unsqueeze(0).to(self.device)
        text_tokens = self.tokenizer(labels).to(self.device)

        with torch.no_grad():
            image_features = self.model.encode_image(image_tensor)
            text_features = self.model.encode_text(text_tokens)
            image_features /= image_features.norm(dim=-1, keepdim=True)
            text_features /= text_features.norm(dim=-1, keepdim=True)
            similarities = (image_features @ text_features.T).squeeze(0)

            best_idx = similarities.argmax().item()
            best_label = labels[best_idx]
            confidence = similarities[best_idx].item()

        return {
            "label": best_label,
            "confidence": float(confidence)
        }
