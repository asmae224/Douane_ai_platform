import time
from rag_agent.services.document_service import DocumentService
from rag_agent.services.pdf_reader import PDFReader
from rag_agent.services.text_cleaner import TextCleaner
from rag_agent.services.text_chunker import TextChunker
from rag_agent.services.search_service import SearchService
from rag_agent.services.prompt_builder import PromptBuilder

from rag_agent.providers.embedding_provider import EmbeddingProvider
from rag_agent.providers.vector_provider import VectorProvider
from rag_agent.providers.provider_factory import ProviderFactory


class RAGService:
    """
    Service principal du RAG Agent.
    """

    def __init__(self):

        self.document_service = DocumentService()

        self.reader = PDFReader()

        self.cleaner = TextCleaner()

        self.chunker = TextChunker()

        self.embedding = EmbeddingProvider()

        self.vector = VectorProvider()

        self.search_service = SearchService(
       embedding_provider=self.embedding,
       vector_provider=self.vector,
       )

        self.prompt_builder = PromptBuilder()

        self.llm = ProviderFactory.get_llm_provider()

    # =====================================================
    # INDEXATION D'UN DOCUMENT
    # =====================================================

    def index_document(
        self,
        document_id: int,
    ):

        # =====================================================
        # 1. Récupération des informations du document
        # =====================================================

        document = self.document_service.get_document(
            document_id
        )

        # =====================================================
        # 2. Téléchargement du document
        # =====================================================

        pdf_path = self.document_service.download_document(
            document
        )

        # =====================================================
        # 3. Lecture du PDF
        # =====================================================

        text = self.reader.read(
            pdf_path
        )

        # =====================================================
        # 4. Nettoyage
        # =====================================================

        clean_text = self.cleaner.clean(
            text
        )

        # =====================================================
        # 5. Découpage
        # =====================================================

        chunks = self.chunker.split(
            clean_text
        )

        # =====================================================
        # 6. Génération des embeddings
        # =====================================================

        embeddings = self.embedding.embed(
            chunks
        )

        # =====================================================
        # 7. Préparation des métadonnées
        # =====================================================

        ids = []

        metadatas = []

        for index, chunk in enumerate(chunks):

            ids.append(
                f"{document.id}_{index}"
            )

            metadatas.append(

                {
                    "document_id": document.id,
                    "chunk_index": index,
                    "filename": document.original_filename,
                    "source": document.original_filename,
                }

            )

        # =====================================================
        # 8. Stockage dans ChromaDB
        # =====================================================

        self.vector.add_documents(

            ids=ids,

            documents=chunks,

            embeddings=embeddings,

            metadatas=metadatas,

        )

        # =====================================================
        # 9. Mise à jour du statut dans le Backend
        # =====================================================

        self.document_service.update_status(

            document_id=document.id,

            status="INDEXED",

        )

        # =====================================================
        # 10. Résultat
        # =====================================================

        return {

            "document_id": document.id,

            "filename": document.original_filename,

            "chunks": len(chunks),

            "status": "INDEXED",

        }

    # =====================================================
    # QUESTION / REPONSE
    # =====================================================

    def ask_question(
        self,
        question: str,
        top_k: int = 5,
        document_id: int | None = None,
    ):

        # =====================================================
        # 1. Recherche vectorielle
        # =====================================================

        search_results = self.search_service.search(

            question=question,

            top_k=top_k,
            document_id=document_id,


        )
        

        # =====================================================
        # 2. Construction du prompt
        # =====================================================

        prompt = self.prompt_builder.build(

            question=question,

            search_results=search_results,

        )

        # =====================================================
        # 3. Appel du LLM
        # =====================================================

        answer = self.llm.generate(

            prompt="Réponds à la question en respectant les instructions et le contexte fournis.",

            context=prompt,

        )

        # =====================================================
        # 4. Résultat
        # =====================================================

        return {

            "question": question,

            "answer": answer,

            "sources": search_results.get(
                "metadatas",
                [],
            ),

        }