import torch
import open_clip
from PIL import Image
from torchvision import transforms

class CLIPModel:
    def __init__(self):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model, _, self.preprocess = open_clip.create_model_and_transforms(
            model_name="ViT-B-32", pretrained="laion2b_s34b_b79k"
        )
        self.tokenizer = open_clip.get_tokenizer("ViT-B-32")
        self.model.to(self.device)

    def get_embedding(self, image: Image.Image):
        image_input = self.preprocess(image).unsqueeze(0).to(self.device)
        with torch.no_grad():
            image_features = self.model.encode_image(image_input)
            image_features = image_features / image_features.norm(dim=-1, keepdim=True)
        return image_features.cpu().numpy().flatten()  # Flatten to 1D vector

    def predict(self, image: Image.Image, labels: list):
        text_inputs = self.tokenizer(labels).to(self.device)
        image_input = self.preprocess(image).unsqueeze(0).to(self.device)

        with torch.no_grad():
            image_features = self.model.encode_image(image_input)
            text_features = self.model.encode_text(text_inputs)

            image_features /= image_features.norm(dim=-1, keepdim=True)
            text_features /= text_features.norm(dim=-1, keepdim=True)

            logits_per_image = (image_features @ text_features.T).squeeze(0)
            probs = logits_per_image.softmax(dim=-1).cpu().numpy()

        best_idx = probs.argmax()
        return {
            "label": labels[best_idx],
            "confidence": float(probs[best_idx])
        }
