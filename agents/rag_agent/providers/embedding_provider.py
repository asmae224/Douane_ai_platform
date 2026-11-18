from rag_agent.providers.provider_factory import ProviderFactory


class EmbeddingProvider:
    """
    Fournit un accès unique au moteur d'embeddings.
    """

    def __init__(self):

        self.embedding = ProviderFactory.get_embedding_provider()

    def embed(
        self,
        texts: list[str],
    ) -> list[list[float]]:

        return self.embedding.embed(texts)