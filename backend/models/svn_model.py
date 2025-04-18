from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
import numpy as np

class SVMModel:
    def __init__(self):
        self.model = None
        self.encoder = LabelEncoder()
        self.is_trained = False

    def train(self, embeddings: np.ndarray, labels: list[str]):
        y_encoded = self.encoder.fit_transform(labels)
        self.model = SVC(kernel='linear', probability=True)
        self.model.fit(embeddings, y_encoded)
        self.is_trained = True

    def predict(self, embedding: np.ndarray) -> dict:
        if not self.is_trained:
            raise RuntimeError("SVM model is not trained yet.")

        embedding = embedding.reshape(1, -1)
        y_pred = self.model.predict(embedding)[0]
        y_prob = self.model.predict_proba(embedding).max()
        label = self.encoder.inverse_transform([y_pred])[0]

        return {
            "label": label,
            "confidence": float(y_prob)
        }
