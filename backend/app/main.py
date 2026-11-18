from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import (
    auth,
    documents,
    users,
    chat,
)

from app.api.routes import internal

from app.mcp.rag_client import RAGClient
from app.api.routes.dashboard import router as dashboard_router
from app.api.routes import platform_settings


# ==========================================================
# Lifespan
# ==========================================================

@asynccontextmanager
async def lifespan(app: FastAPI):

    # ======================================================
    # Démarrage
    # ======================================================

    RAGClient.start()

    yield

    # ======================================================
    # Arrêt
    # ======================================================

    RAGClient.stop()


# ==========================================================
# Application FastAPI
# ==========================================================

app = FastAPI(
    title="PRJ_MCP API",
    description="Plateforme Agentique basée sur MCP",
    version="1.0.0",
    lifespan=lifespan,
)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# Root
# ==========================================================

@app.get("/")
def root():

    return {
        "message": "Bienvenue sur la plateforme PRJ_MCP"
    }


# ==========================================================
# Routes
# ==========================================================

app.include_router(
    auth.router,
    prefix="/api",
)

app.include_router(
    users.router,
    prefix="/api",
)

app.include_router(
    documents.router,
    prefix="/api",
)

app.include_router(
    internal.router,
    prefix="/api",
)

app.include_router(
    chat.router,
    prefix="/api",
)
app.include_router(
    dashboard_router,
    prefix="/api",
)
app.include_router(
    platform_settings.router,
    prefix="/api",
)