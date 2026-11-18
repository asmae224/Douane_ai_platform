from pathlib import Path

import fitz


class PDFReader:
    """
    Lecture des documents PDF importés par le backend.
    """

    def read(self, file_path: str) -> str:

        pdf_path = Path(file_path)

        if not pdf_path.exists():
            raise FileNotFoundError(
                f"Document introuvable : {pdf_path}"
            )

        document = fitz.open(pdf_path)

        pages = []

        try:

            for page in document:
                pages.append(page.get_text())

        finally:
            document.close()

        return "\n".join(pages)