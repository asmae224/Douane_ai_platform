from datetime import datetime

from pydantic import BaseModel, ConfigDict

from app.models.document import DocumentStatus


# ==========================================================
# Réponse d'un document
# ==========================================================

class DocumentResponse(BaseModel):
    """
    Informations renvoyées au frontend.
    """

    id: int
    original_filename: str
    file_size: int
    mime_type: str
    status: DocumentStatus
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)
    # ==========================================================
# Réponse interne (Agents MCP)
# ==========================================================

class DocumentInternalResponse(BaseModel):
    """
    Réponse destinée aux agents MCP.
    """

    id: int

    original_filename: str

    stored_filename: str

    file_path: str

    file_size: int

    mime_type: str

    status: DocumentStatus

    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================================
# Liste des documents
# ==========================================================

class DocumentListResponse(BaseModel):
    """
    Liste des documents.
    """

    documents: list[DocumentResponse]


# ==========================================================
# Message générique
# ==========================================================

class DocumentMessage(BaseModel):
    """
    Message retourné par l'API.
    """

    message: str

class DocumentStatusUpdate(BaseModel):
    """
    Mise à jour du statut d'un document.
    """

    status: DocumentStatus