import chromadb

from common.interfaces.vectorstore_interface import VectorStoreInterface


class ChromaDBAdapter(VectorStoreInterface):
    """
    Adaptateur ChromaDB.
    """

    def __init__(
        self,
        db_path: str,
        collection_name: str,
    ):

        self.client = chromadb.PersistentClient(
            path=db_path
        )

        self.collection = self.client.get_or_create_collection(
            name=collection_name
        )

    # =====================================================
    # Indexation
    # =====================================================

    def add_documents(
        self,
        ids,
        documents,
        embeddings,
        metadatas,
    ):

        self.collection.add(

            ids=ids,

            documents=documents,

            embeddings=embeddings,

            metadatas=metadatas,

        )

    # =====================================================
    # Recherche
    # =====================================================

    def similarity_search(
    self,
    embedding,
    top_k=5,
    document_id: int | None = None,
):

     query_parameters = {
        "query_embeddings": [embedding],
        "n_results": top_k,
    }

    # Recherche ciblée sur un document précis
     if document_id is not None:

        query_parameters["where"] = {
            "document_id": document_id,
        }

     return self.collection.query(
        **query_parameters
    )

    # =====================================================
    # Suppression
    # =====================================================

    def delete_document(
        self,
        document_id: int,
    ):

        results = self.collection.get(

            where={

                "document_id": document_id,

            }

        )

        ids = results.get("ids", [])

        if ids:

            self.collection.delete(ids=ids)

    # =====================================================
    # Nombre de chunks
    # =====================================================

    def count(self):

        return self.collection.count()