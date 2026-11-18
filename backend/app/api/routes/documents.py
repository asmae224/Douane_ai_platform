from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    status,
    UploadFile,
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.api.deps import (
    get_current_admin,
    get_current_user,
    get_db,
)
from app.models.user import User
from app.schemas.document import (
    DocumentListResponse,
    DocumentResponse,
    DocumentInternalResponse,
)
from app.services.document_service import DocumentService
from app.mcp.rag_client import RAGClient
from app.mcp.rag_client import RAGClient

router = APIRouter(
    prefix="/documents",
    tags=["Documents"],
)


@router.post(
    "",
    response_model=DocumentResponse,
    status_code=status.HTTP_201_CREATED,
)
def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):
    try:
        return DocumentService.upload_document(
            db=db,
            file=file,
            uploaded_by=current_user.id,
        )
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )


@router.get(
    "",
    response_model=DocumentListResponse,
)
def get_all_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    documents = DocumentService.get_all_documents(db)

    return DocumentListResponse(
        documents=documents,
    )


# ==========================================================
# Récupérer les informations d'un document
# ==========================================================

@router.get(
    "/{document_id}",
    response_model=DocumentInternalResponse,
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:

        return DocumentService.get_document(
            db,
            document_id,
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


# ==========================================================
# Consulter le document
# ==========================================================

@router.get(
    "/{document_id}/view",
)
def view_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:

        document = DocumentService.get_document(
            db,
            document_id,
        )

        return FileResponse(
            path=document.file_path,
            media_type=document.mime_type,
            filename=document.original_filename,
            headers={
                "Content-Disposition": "inline",
                "Access-Control-Expose-Headers": "Content-Disposition",
            },
        )

    except ValueError as e:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.get(
    "/{document_id}/download",
)
def download_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    try:
        document = DocumentService.get_document(
            db,
            document_id,
        )

        return FileResponse(
            path=document.file_path,
            media_type="application/octet-stream",
            filename=document.original_filename,
             headers={
        "Access-Control-Expose-Headers": "Content-Disposition",
    },
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )


@router.delete(
    "/{document_id}",
    response_model=DocumentResponse,
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin),
):

    try:
        return DocumentService.delete_document(
            db,
            document_id,
        )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )

