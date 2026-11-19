# Douane AI Platform

An intelligent document-assistance platform designed for customs-related workflows. The project combines a React frontend, a FastAPI backend, and a Retrieval-Augmented Generation (RAG) agent communicating through the Model Context Protocol (MCP).

> **Project status:** Academic / portfolio project. The repository documents the implementation and local development setup. Production deployment requires additional configuration and security hardening.

## Overview

Douane AI Platform provides a modular architecture for managing documents and retrieving relevant information through an AI-powered assistant.

The application consists of three main components:

- **Frontend:** React interface for authentication, document management, user administration, dashboards and AI-assisted interactions.
- **Backend:** FastAPI REST API responsible for authentication, users, document operations, database access and application services.
- **RAG Agent:** Python-based MCP service responsible for document indexing and retrieval-based question answering.

## Architecture

```text
React Frontend (Vite)
        |
        | HTTP / REST API
        v
FastAPI Backend -------- PostgreSQL
        |
        | MCP communication (stdio)
        v
      RAG Agent
        |
        +---- Hugging Face Embeddings
        |
        +---- ChromaDB Vector Store
        |
        +---- Ollama LLM
```

## Main Features

- User authentication and account activation.
- Role-based access for administrators and standard users.
- Document upload and management.
- Document indexing and vector storage.
- Context-aware question answering using RAG.
- MCP-based communication between the backend and the AI agent.
- Dashboard and user administration.
- Platform configuration management.

## Technology Stack

| Component | Technologies |
|---|---|
| Frontend | React 19, Vite, React Router, Axios, Tailwind CSS, Material UI |
| Backend | Python, FastAPI, Pydantic, SQLAlchemy |
| Database | PostgreSQL |
| Migrations | Alembic |
| AI communication | Model Context Protocol (MCP), FastMCP |
| RAG | Hugging Face, ChromaDB, Ollama |

## Project Structure

```text
.
├── agents/
│   ├── common/
│   └── rag_agent/
│       ├── adapters/
│       ├── capabilities/
│       ├── providers/
│       └── services/
│
├── backend/
│   ├── alembic/
│   └── app/
│       ├── api/
│       ├── core/
│       ├── mcp/
│       ├── models/
│       ├── schemas/
│       └── services/
│
└── frontend/
    ├── public/
    └── src/
        ├── components/
        ├── contexts/
        ├── layouts/
        ├── pages/
        ├── router/
        └── services/
```

## Prerequisites

- Python
- Node.js and npm
- PostgreSQL
- Ollama
- A compatible local language model
- The required AI provider credentials, if applicable

## Local Installation

### 1. Environment Configuration

Create the following local configuration files:

- `backend/.env`
- `agents/rag_agent/.env`

Use the corresponding `.env.example` files as templates.

Never commit actual credentials, passwords, API keys or tokens.

### 2. Backend Setup

```powershell
cd backend

py -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt
```

Configure PostgreSQL before applying database migrations.

```powershell
alembic upgrade head
```

Start the API:

```powershell
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

API documentation:

http://127.0.0.1:8000/docs

### 3. RAG Agent Setup

Open a separate PowerShell terminal:

```powershell
cd agents/rag_agent

py -m venv .venv
.\.venv\Scripts\Activate.ps1

python -m pip install --upgrade pip
pip install -r requirements.txt
```

Configure the embedding provider, vector database and language model in `agents/rag_agent/.env`.

Ensure that Ollama is running and that the configured model is available locally.

### 4. Frontend Setup

Open another terminal:

```powershell
cd frontend

npm install
npm run dev
```

Frontend development URL:

http://localhost:5174

## Environment Variables

### Backend

The backend configuration includes:

- Application and authentication settings.
- PostgreSQL connection parameters.
- AI provider configuration.
- SMTP email configuration.

### RAG Agent

The agent configuration includes:

- Embedding provider and model.
- Vector database provider and collection.
- Document chunking parameters.
- Backend API URL.
- LLM provider and model.

Refer to the `.env.example` files for the complete variable templates.

## Important Notes

- The current MCP process launcher uses a Windows virtual-environment path.
- The backend API URL and CORS configuration are intended for local development.
- The PostgreSQL driver configured by SQLAlchemy must match the installed PostgreSQL Python driver.
- Production deployment requires appropriate secret management, CORS restrictions, database security and infrastructure configuration.

## Security

- Never commit `.env` files or real credentials.
- Do not upload private documents, database dumps or local vector-store data.
- Use strong secrets and production-specific configuration.
- Do not expose development services directly to the public internet.

## License

No license has been specified yet. All rights remain reserved unless a license is added to this repository.
