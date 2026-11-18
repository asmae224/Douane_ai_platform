from rag_agent.providers.provider_factory import ProviderFactory


class VectorProvider:
    """
    Fournit un accès indépendant à la base vectorielle.
    """

    def __init__(self):

        self.vector_store = ProviderFactory.get_vector_provider()

    # --------------------------------------------------
    # Indexation
    # --------------------------------------------------

    def add_documents(
        self,
        ids,
        documents,
        embeddings,
        metadatas,
    ):

        return self.vector_store.add_documents(

            ids=ids,

            documents=documents,

            embeddings=embeddings,

            metadatas=metadatas,

        )

    # --------------------------------------------------
    # Recherche
    # --------------------------------------------------

    def similarity_search(
    self,
    embedding,
    top_k=5,
    document_id: int | None = None,
):

     return self.vector_store.similarity_search(

        embedding=embedding,

        top_k=top_k,

        document_id=document_id,

    )

    # --------------------------------------------------
    # Suppression
    # --------------------------------------------------

    def delete_document(
        self,
        document_id: int,
    ):

        return self.vector_store.delete_document(document_id)

    # --------------------------------------------------
    # Statistiques
    # --------------------------------------------------

    def count(self):

        return self.vector_store.count()