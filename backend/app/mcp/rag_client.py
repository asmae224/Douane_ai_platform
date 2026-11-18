import asyncio
import logging
import threading
from contextlib import AsyncExitStack
from pathlib import Path

from mcp import ClientSession
from mcp.client.stdio import (
    StdioServerParameters,
    stdio_client,
)


logger = logging.getLogger(__name__)


# ==========================================================
# Chemins du projet
# ==========================================================

ROOT_DIR = Path(__file__).resolve().parents[3]

AGENTS_DIR = ROOT_DIR / "agents"

RAG_PYTHON = (
    AGENTS_DIR
    / "rag_agent"
    / ".venv"
    / "Scripts"
    / "python.exe"
)


# ==========================================================
# RAG Client
# ==========================================================

class RAGClient:
    """
    Client MCP permettant à FastAPI de communiquer
    avec le RAG Agent.

    La connexion MCP est persistante pendant toute
    la durée de vie de l'application FastAPI.

    Le processus RAG Agent n'est donc lancé qu'une seule fois.
    """

    # ======================================================
    # Paramètres du serveur MCP
    # ======================================================

    SERVER_PARAMS = StdioServerParameters(
        command=str(RAG_PYTHON),
        args=[
            "-m",
            "rag_agent.server",
        ],
        cwd=str(AGENTS_DIR),
    )

    # ======================================================
    # État interne
    # ======================================================

    _loop = None
    _thread = None

    _session = None
    _exit_stack = None

    _started = False

    _start_lock = threading.Lock()

    _ready_event = threading.Event()

    # ======================================================
    # Boucle asyncio dédiée au MCP
    # ======================================================

    @classmethod
    def _run_loop(cls):
        """
        Lance une boucle asyncio dédiée à la connexion MCP.
        """

        cls._loop = asyncio.new_event_loop()

        asyncio.set_event_loop(cls._loop)

        try:

            cls._loop.run_forever()

        finally:

            cls._loop.close()

            cls._loop = None

    # ======================================================
    # Initialisation asynchrone de MCP
    # ======================================================

    @classmethod
    async def _initialize(cls):
        """
        Initialise le processus RAG Agent et la session MCP.

        Cette méthode est exécutée UNE SEULE FOIS.
        """

        cls._exit_stack = AsyncExitStack()

        # --------------------------------------------------
        # Lancement du serveur RAG
        # --------------------------------------------------

        read, write = await cls._exit_stack.enter_async_context(
            stdio_client(cls.SERVER_PARAMS)
        )

        # --------------------------------------------------
        # Création de la session MCP
        # --------------------------------------------------

        cls._session = await cls._exit_stack.enter_async_context(
            ClientSession(
                read,
                write,
            )
        )

        # --------------------------------------------------
        # Initialisation MCP
        # --------------------------------------------------

        await cls._session.initialize()

        cls._started = True

        cls._ready_event.set()

    # ======================================================
    # Démarrage du RAG Agent
    # ======================================================

    @classmethod
    def start(cls):
        """
        Démarre le RAG Agent une seule fois.

        Cette méthode est appelée au démarrage de FastAPI.
        """

        with cls._start_lock:

            if cls._started:
                return

            cls._ready_event.clear()

            # --------------------------------------------------
            # Création du thread dédié au MCP
            # --------------------------------------------------

            cls._thread = threading.Thread(
                target=cls._run_loop,
                name="rag-mcp-loop",
                daemon=True,
            )

            cls._thread.start()

            # --------------------------------------------------
            # Attendre que la boucle asyncio soit prête
            # --------------------------------------------------

            while cls._loop is None:

                threading.Event().wait(0.01)

            # --------------------------------------------------
            # Initialiser MCP dans sa boucle
            # --------------------------------------------------

            future = asyncio.run_coroutine_threadsafe(
                cls._initialize(),
                cls._loop,
            )

            try:

                future.result()

            except Exception:

                logger.exception(
                    "Impossible de démarrer le RAG Agent MCP."
                )

                cls._started = False

                raise

    # ======================================================
    # Appel d'un outil MCP
    # ======================================================

    @classmethod
    async def _call_tool_async(
        cls,
        tool_name: str,
        arguments: dict,
    ):
        """
        Appelle un outil MCP sur la session persistante.
        """

        if not cls._started or cls._session is None:

            raise RuntimeError(
                "Le RAG Agent MCP n'est pas démarré."
            )

        result = await cls._session.call_tool(
            tool_name,
            arguments,
        )

        return result

    # ======================================================
    # Appel synchrone depuis FastAPI
    # ======================================================

    @classmethod
    def _call_tool(
        cls,
        tool_name: str,
        arguments: dict,
    ):
        """
        Permet aux routes FastAPI synchrones d'utiliser
        la session MCP persistante.
        """

        if not cls._started:
            cls.start()

        if cls._loop is None:

            raise RuntimeError(
                "La boucle MCP n'est pas disponible."
            )

        future = asyncio.run_coroutine_threadsafe(
            cls._call_tool_async(
                tool_name,
                arguments,
            ),
            cls._loop,
        )

        try:

            return future.result()

        except Exception as e:

            logger.exception(
                "Erreur pendant l'appel MCP : %s",
                tool_name,
            )

            raise RuntimeError(
                f"Erreur MCP : {e}"
            ) from e

    # ======================================================
    # INDEXATION
    # ======================================================

    @classmethod
    def index_document(
        cls,
        document_id: int,
    ):
        """
        Indexe un document via la session MCP persistante.
        """

        return cls._call_tool(
            "index_document_tool",
            {
                "document_id": document_id,
            },
        )

    # ======================================================
    # QUESTION / RÉPONSE
    # ======================================================

    @classmethod
    def ask_question(
        cls,
        question: str,
        document_id: int | None = None,
        top_k: int = 5,
    ):
        """
        Pose une question au RAG Agent via la session MCP
        persistante.
        """

        return cls._call_tool(
            "ask_question_tool",
            {
                "question": question,
                "top_k": top_k,
                "document_id": document_id,
            },
        )

    # ======================================================
    # ARRÊT DU RAG Agent
    # ======================================================

    @classmethod
    async def _shutdown(cls):
        """
        Ferme proprement la session MCP et le processus RAG.
        """

        if cls._exit_stack is not None:

            try:

                await cls._exit_stack.aclose()

            finally:

                cls._exit_stack = None
                cls._session = None
                cls._started = False

    @classmethod
    def stop(cls):
        """
        Arrête proprement le RAG Agent.

        Cette méthode est appelée lors de l'arrêt de FastAPI.
        """

        if cls._loop is None:
            return

        try:

            future = asyncio.run_coroutine_threadsafe(
                cls._shutdown(),
                cls._loop,
            )

            future.result()

        except Exception:

            logger.exception(
                "Erreur pendant l'arrêt du RAG Agent MCP."
            )

        finally:

            cls._loop.call_soon_threadsafe(
                cls._loop.stop
            )

            if cls._thread is not None:

                cls._thread.join(
                    timeout=10
                )

            cls._thread = None
            cls._loop = None
            cls._session = None
            cls._exit_stack = None
            cls._started = False