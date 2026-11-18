
from pathlib import Path
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parent


class Settings(BaseSettings):
    """
    Configuration du RAG Agent.
    Toutes les variables proviennent du fichier .env.
    """

    # ==========================
    # Agent
    # ==========================

    AGENT_NAME: str

    # ==========================
    # Embedding
    # ==========================

    EMBEDDING_PROVIDER: str
    EMBEDDING_MODEL: str

    # ==========================
    # Vector Database
    # ==========================

    CHROMA_COLLECTION: str
    VECTOR_PROVIDER: str
    CHROMA_DB_PATH: str
    BACKEND_API_URL: str

    # ==========================
    # Chunking
    # ==========================

    CHUNK_SIZE: int
    CHUNK_OVERLAP: int

    # ==========================
    # LLM
    # ==========================

    LLM_PROVIDER: str

    # Ollama
    OLLAMA_BASE_URL: str = "http://localhost:11434"
    OLLAMA_MODEL: str = "qwen2.5:3b"

    

    # ==========================
    # Logging
    # ==========================

    LOG_LEVEL: str = "INFO"

    model_config = SettingsConfigDict(
        env_file=BASE_DIR / ".env",
        extra="ignore",
    )


settings = Settings()
