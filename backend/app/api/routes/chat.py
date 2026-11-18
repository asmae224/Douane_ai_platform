from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.mcp.rag_client import RAGClient


router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


# ==========================================================
# Request
# ==========================================================

class ChatRequest(BaseModel):

    question: str

    # None = recherche globale
    # ID = recherche dans un document précis
    document_id: int | None = None


# ==========================================================
# Response
# ==========================================================

class ChatResponse(BaseModel):

    question: str

    answer: str

    sources: list


# ==========================================================
# Chat avec le RAG Agent
# ==========================================================

@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
):

    result = RAGClient.ask_question(
        question=request.question,
        document_id=request.document_id,
    )

    # ======================================================
    # Vérification d'une erreur MCP
    # ======================================================

    if result.is_error:

        raise HTTPException(
            status_code=500,
            detail=result.content[0].text,
        )

    # ======================================================
    # Récupération de la réponse structurée
    # ======================================================

    response = result.structured_content

    # ======================================================
    # Réponse au frontend
    # ======================================================

    return ChatResponse(

        question=response["question"],

        answer=response["answer"],

        sources=response["sources"],

    )