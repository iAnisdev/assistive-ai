import numpy as np
from models.knn_model import KNNModel
from models.svn_model import SVMModel
from models.clip_model import CLIPModel
from torchvision.datasets import CIFAR10

def train_models():
    print("🚀 Training SVM and k-NN models using CIFAR10 + CLIP...")

    clip = CLIPModel()
    svm = SVMModel()
    knn = KNNModel()

    dataset = CIFAR10(root="./data", download=True)
    embeddings = []
    labels = []

    # Limit training data
    for i, (pil_img, label_idx) in enumerate(dataset):
        emb = clip.get_embedding(pil_img)
        embeddings.append(emb)
        labels.append(dataset.classes[label_idx])

    X = np.array(embeddings)
    y = labels

    svm.train(X, y)
    knn.train(X, y)

    print("✅ Training complete!")
    return svm, knn
