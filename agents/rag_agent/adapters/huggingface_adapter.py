from sentence_transformers import SentenceTransformer

from common.interfaces.embedding_interface import EmbeddingInterface


class HuggingFaceAdapter(EmbeddingInterface):
    """
    Adapter HuggingFace.
    """

    def __init__(self, model_name: str):

        self.model = SentenceTransformer(model_name)

    def embed(self, texts: list[str]) -> list[list[float]]:

        embeddings = self.model.encode(
            texts,
            convert_to_numpy=True,
            normalize_embeddings=True,
        )

        return embeddings.tolist()