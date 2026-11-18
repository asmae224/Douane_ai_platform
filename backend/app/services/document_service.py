import os
import shutil
import uuid
from pathlib import Path

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.document import (
    Document,
    DocumentStatus,
)
from app.mcp.rag_client import RAGClient

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx",
    ".doc",
    ".txt",
}

MAX_FILE_SIZE = 20 * 1024 * 1024  # 20 MB


class DocumentService:
    """
    Service responsable de la gestion des documents.
    """

    @staticmethod
    def upload_document(
        db: Session,
        file: UploadFile,
        uploaded_by: int,
    ) -> Document:

        extension = Path(file.filename).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise ValueError(
                "Format de fichier non autorisé. "
                "Formats acceptés : PDF, DOC, DOCX, TXT."
            )

        file.file.seek(0, os.SEEK_END)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > MAX_FILE_SIZE:
            raise ValueError(
                "La taille maximale autorisée est de 20 MB."
            )

        stored_filename = f"{uuid.uuid4()}{extension}"

        file_path = UPLOAD_DIR / stored_filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        document = Document(
            original_filename=file.filename,
            stored_filename=stored_filename,
            file_path=str(file_path),
            file_size=file_size,
            mime_type=file.content_type,
            status=DocumentStatus.UPLOADED,
            uploaded_by=uploaded_by,
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        # ==================================================
        # Déclenchement automatique de l'indexation MCP
        # ==================================================

        try:

            RAGClient.index_document(
                document.id
            )

            db.refresh(document)

        except Exception as e:

            print(
                f"[MCP] Erreur pendant l'indexation : {e}"
            )

        return document

    @staticmethod
    def update_document_status(
        db: Session,
        document_id: int,
        status: DocumentStatus,
    ) -> Document:

        document = (
            db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

        if not document:
            raise ValueError("Document introuvable.")

        document.status = status

        db.commit()
        db.refresh(document)

        return document

    @staticmethod
    def get_all_documents(
        db: Session,
    ) -> list[Document]:

        return (
            db.query(Document)
            .order_by(
                Document.uploaded_at.desc()
            )
            .all()
        )

    @staticmethod
    def get_document(
        db: Session,
        document_id: int,
    ) -> Document:

        document = (
            db.query(Document)
            .filter(
                Document.id == document_id
            )
            .first()
        )

        if not document:
            raise ValueError(
                "Document introuvable."
            )

        return document

    @staticmethod
    def delete_document(
        db: Session,
        document_id: int,
    ) -> Document:

        document = (
            db.query(Document)
            .filter(
                Document.id == document_id
            )
            .first()
        )

        if not document:
            raise ValueError(
                "Document introuvable."
            )

        if os.path.exists(document.file_path):
            os.remove(document.file_path)

        db.delete(document)
        db.commit()

        return document