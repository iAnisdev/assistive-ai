from models.clip_model import CLIPModel
from models.caption_model import CaptionModel
from utils.nlp import extract_labels

class MCPipeline:
    def __init__(self, svm_model, knn_model):
        self.clip = CLIPModel()
        self.captioner = CaptionModel()
        self.svm = svm_model
        self.knn = knn_model

    def run(self, image):
        caption = self.captioner.generate_caption(image)
        labels = extract_labels(caption)
        if not labels:
            labels = ["object"]

        # Step 1: Try CLIP
        result = self.clip.predict(image, labels)

        # Step 2: Fallback to k-NN if confidence is too low
        if result["confidence"] < 0.4:
            embedding = self.clip.get_embedding(image)
            result = self.knn.predict(embedding)
            result["fallback_used"] = "knn"
        else:
            result["fallback_used"] = "clip"

        result["caption"] = caption
        result["used_labels"] = labels
        return result
