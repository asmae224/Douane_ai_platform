from rag_agent.services.rag_service import RAGService


rag_service = RAGService()


def index_document(
    document_id: int,
):
    """
    Capability MCP.
    """

    return rag_service.index_document(
        document_id
    )