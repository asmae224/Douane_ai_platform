from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import get_db
from app.models.document import DocumentStatus
from app.schemas.document import (
    DocumentResponse,
    DocumentInternalResponse,
    DocumentStatusUpdate,
)
from app.services.document_service import DocumentService

router = APIRouter(
    prefix="/internal",
    tags=["Internal API"],
)


# ==========================================================
# Récupérer un document
# ==========================================================

@router.get(
    "/documents/{document_id}",
    response_model=DocumentInternalResponse,
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
):

    try:

        return DocumentService.get_document(
            db=db,
            document_id=document_id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


# ==========================================================
# Télécharger un document
# ==========================================================

@router.get(
    "/documents/{document_id}/download",
)
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
):

    try:

        document = DocumentService.get_document(
            db=db,
            document_id=document_id,
        )

        return FileResponse(
            path=document.file_path,
            media_type="application/octet-stream",
            filename=document.original_filename,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


# ==========================================================
# Modifier le statut
# ==========================================================

@router.patch(
    "/documents/{document_id}/status",
    response_model=DocumentInternalResponse,
)
def update_document_status(
    document_id: int,
    payload: DocumentStatusUpdate,
    db: Session = Depends(get_db),
):

    try:

        return DocumentService.update_document_status(
            db=db,
            document_id=document_id,
            status=payload.status,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )