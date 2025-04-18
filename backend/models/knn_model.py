from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import LabelEncoder
import numpy as np

class KNNModel:
    def __init__(self, k: int = 3):
        self.k = k
        self.model = None
        self.encoder = LabelEncoder()
        self.is_trained = False

    def train(self, embeddings: np.ndarray, labels: list[str]):
        y_encoded = self.encoder.fit_transform(labels)
        self.model = KNeighborsClassifier(n_neighbors=self.k)
        self.model.fit(embeddings, y_encoded)
        self.is_trained = True

    def predict(self, embedding: np.ndarray) -> dict:
        if not self.is_trained:
            raise RuntimeError("k-NN model is not trained yet.")

        embedding = embedding.reshape(1, -1)
        y_pred = self.model.predict(embedding)[0]
        label = self.encoder.inverse_transform([y_pred])[0]

        # Approximate confidence as inverse distance ratio
        distances, indices = self.model.kneighbors(embedding)
        confidence = 1 - distances[0][0] / (distances[0][1] + 1e-5)

        return {
            "label": label,
            "confidence": float(confidence)
        }
