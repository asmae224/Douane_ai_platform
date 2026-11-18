from abc import ABC, abstractmethod


class EmbeddingInterface(ABC):
    """
    Interface commune pour tous les modèles d'embeddings.
    """

    @abstractmethod
    def embed(self, texts: list[str]) -> list[list[float]]:
        """
        Génère les embeddings d'une liste de textes.

        Args:
            texts: liste des chunks

        Returns:
            liste des vecteurs
        """
        pass