from pydantic import BaseModel


class ChatRequest(BaseModel):
    """
    Requête envoyée par le frontend.
    """

    question: str


class ChatResponse(BaseModel):
    """
    Réponse retournée par le RAG Agent.
    """

    question: str

    answer: str

    sources: list