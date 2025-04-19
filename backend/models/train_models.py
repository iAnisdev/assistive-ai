import numpy as np

from models.knn_model import KNNModel
from models.svn_model import SVMModel
from models.clip_model import CLIPModel

from torchvision.datasets import CIFAR10
from torchvision.transforms import ToPILImage
from torch.utils.data import DataLoader


def train_models():
    print("🚀 Training SVM and k-NN models using CIFAR10 + CLIP...")

    # Initialize models
    clip = CLIPModel()
    svm = SVMModel()
    knn = KNNModel()

    # Load CIFAR10
    dataset = CIFAR10(root="./data", download=True)
    loader = DataLoader(dataset, batch_size=32)
    to_pil = ToPILImage()

    embeddings = []
    labels = []

    # Loop through dataset and embed each image
    for img_tensor, label_idx in loader:
        for i in range(img_tensor.shape[0]):
            pil_img = to_pil(img_tensor[i])
            emb = clip.get_embedding(pil_img)
            embeddings.append(emb)
            labels.append(dataset.classes[label_idx[i]])

    # Convert to numpy
    X = np.array(embeddings)
    y = labels

    # Train models
    svm.train(X, y)
    knn.train(X, y)

    print("✅ Training complete!")
    return svm, knn
