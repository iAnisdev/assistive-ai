import spacy

nlp = spacy.load("en_core_web_sm")

def extract_labels(caption: str) -> list:
    doc = nlp(caption)
    labels = [token.text.lower() for token in doc if token.pos_ in {"NOUN", "PROPN"} and len(token.text) > 2]
    return list(set(labels))
