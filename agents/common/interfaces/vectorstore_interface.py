from abc import ABC, abstractmethod


class VectorStoreInterface(ABC):
    """
    Interface commune pour toutes les bases vectorielles.
    """

    @abstractmethod
    def add_documents(
        self,
        ids: list[str],
        documents: list[str],
        embeddings: list[list[float]],
        metadatas: list[dict],
    ):
        pass

    @abstractmethod
    def similarity_search(
        self,
        embedding: list[float],
        top_k: int,
        document_id: int | None = None,
    ):
        pass

    @abstractmethod
    def delete_document(
        self,
        document_id: int,
    ):
        pass

    @abstractmethod
    def count(self):
        pass