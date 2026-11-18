from langchain_text_splitters import RecursiveCharacterTextSplitter

from rag_agent.config import settings


class TextChunker:
    """
    Responsable du découpage intelligent du texte.
    """

    def __init__(
        self,
        chunk_size: int | None = None,
        chunk_overlap: int | None = None,
    ):

        self.splitter = RecursiveCharacterTextSplitter(

            chunk_size=(
                chunk_size
                if chunk_size is not None
                else settings.CHUNK_SIZE
            ),

            chunk_overlap=(
                chunk_overlap
                if chunk_overlap is not None
                else settings.CHUNK_OVERLAP
            ),

            separators=[
                "\n\n",
                "\n",
                ". ",
                ";",
                ",",
                " ",
                "",
            ],
        )

    def split(self, text: str) -> list[str]:
        """
        Découpe le texte en morceaux.
        """

        return self.splitter.split_text(text)