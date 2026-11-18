from rag_agent.services.rag_service import RAGService


rag_service = RAGService()


def ask_question(
    question: str,
    top_k: int = 5,
    document_id: int | None = None,
):
    """
    Recherche les passages les plus pertinents
    puis génère une réponse avec le LLM.

    Si document_id est fourni, la recherche est limitée
    au document sélectionné.

    Si document_id est None, la recherche est globale.
    """

    return rag_service.ask_question(

        question=question,

        top_k=top_k,

        document_id=document_id,

    )