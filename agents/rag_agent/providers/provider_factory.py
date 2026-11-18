
from rag_agent.config import settings

from common.interfaces.embedding_interface import EmbeddingInterface
from common.interfaces.vectorstore_interface import VectorStoreInterface
from common.interfaces.llm_interface import LLMInterface

from rag_agent.adapters.huggingface_adapter import HuggingFaceAdapter
from rag_agent.adapters.chromadb_adapter import ChromaDBAdapter
from rag_agent.adapters.ollama_adapter import OllamaAdapter


class ProviderFactory:

    @staticmethod
    def get_embedding_provider() -> EmbeddingInterface:

        provider = settings.EMBEDDING_PROVIDER.lower()

        if provider == "huggingface":
            return HuggingFaceAdapter(settings.EMBEDDING_MODEL)

        raise ValueError(
            f"Embedding provider '{provider}' non supporté."
        )

    @staticmethod
    def get_vector_provider() -> VectorStoreInterface:

        provider = settings.VECTOR_PROVIDER.lower()

        if provider == "chromadb":
            return ChromaDBAdapter(
                db_path=settings.CHROMA_DB_PATH,
                collection_name=settings.CHROMA_COLLECTION,
            )

        raise ValueError(
            f"Vector provider '{provider}' non supporté."
        )

    @staticmethod
    def get_llm_provider() -> LLMInterface:

        provider = settings.LLM_PROVIDER.lower()

        if provider == "ollama":
            return OllamaAdapter(
                base_url=settings.OLLAMA_BASE_URL,
                model=settings.OLLAMA_MODEL,
            )

        raise ValueError(
            f"LLM provider '{provider}' non supporté."
        )
