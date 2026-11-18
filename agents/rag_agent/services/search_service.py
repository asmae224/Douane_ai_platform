from rag_agent.providers.embedding_provider import EmbeddingProvider
from rag_agent.providers.vector_provider import VectorProvider


class SearchService:
    """
    Responsable de la recherche vectorielle.

    Les providers sont injectés depuis RAGService afin
    d'éviter de créer plusieurs instances des mêmes moteurs.
    """

    def __init__(
        self,
        embedding_provider: EmbeddingProvider,
        vector_provider: VectorProvider,
    ):

        self.embedding_provider = embedding_provider
        self.vector_provider = vector_provider

    def search(
        self,
        question: str,
        top_k: int = 5,
        document_id: int | None = None,
    ):

        # 1. Embedding de la question
        query_embedding = self.embedding_provider.embed(
            [question]
        )[0]

        # 2. Recherche vectorielle
        results = self.vector_provider.similarity_search(
            embedding=query_embedding,
            top_k=top_k,
            document_id=document_id,
        )

        return results