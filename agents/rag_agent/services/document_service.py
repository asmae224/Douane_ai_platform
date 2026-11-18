from dataclasses import dataclass
from pathlib import Path

import httpx

from rag_agent.config import settings


DOWNLOAD_DIR = Path("downloads")
DOWNLOAD_DIR.mkdir(exist_ok=True)


@dataclass
class Document:

    id: int

    original_filename: str

    stored_filename: str

    file_path: str

    file_size: int

    mime_type: str

    status: str


class DocumentService:
    """
    Communication avec le Backend.
    """

    # --------------------------------------------------
    # Récupération d'un document
    # --------------------------------------------------

    def get_document(
        self,
        document_id: int,
    ) -> Document:

        url = (
            f"{settings.BACKEND_API_URL}"
            f"/internal/documents/{document_id}"
        )

        response = httpx.get(url)

        response.raise_for_status()

        data = response.json()

        return Document(

            id=data["id"],

            original_filename=data["original_filename"],

            stored_filename=data["stored_filename"],

            file_path=data["file_path"],

            file_size=data["file_size"],

            mime_type=data["mime_type"],

            status=data["status"],

        )

    # --------------------------------------------------
    # Téléchargement du document
    # --------------------------------------------------

    def download_document(
        self,
        document: Document,
    ) -> str:

        url = (
            f"{settings.BACKEND_API_URL}"
            f"/internal/documents/{document.id}/download"
        )

        response = httpx.get(url)

        response.raise_for_status()

        local_path = DOWNLOAD_DIR / document.stored_filename

        with open(local_path, "wb") as f:

            f.write(response.content)

        return str(local_path)

    # --------------------------------------------------
    # Mise à jour du statut
    # --------------------------------------------------

    def update_status(
        self,
        document_id: int,
        status: str,
    ):

        url = (
            f"{settings.BACKEND_API_URL}"
            f"/internal/documents/{document_id}/status"
        )

        response = httpx.patch(

            url,

            json={
                "status": status,
            },

        )

        response.raise_for_status()

        return response.json()