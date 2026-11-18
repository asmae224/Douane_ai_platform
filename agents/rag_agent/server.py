from fastmcp import FastMCP

from rag_agent.capabilities.index_document import index_document
from rag_agent.capabilities.ask_question import ask_question


mcp = FastMCP("RAG Agent")


# ======================================================
# Indexation d'un document
# ======================================================

@mcp.tool()
def index_document_tool(
    document_id: int,
):
    """
    Indexe un document dans la base vectorielle.
    """

    return index_document(
        document_id=document_id,
    )


# ======================================================
# Question / Réponse
# ======================================================

@mcp.tool()
def ask_question_tool(
    question: str,
    top_k: int = 5,
    document_id: int | None = None,
):
    """
    Recherche les passages les plus pertinents
    puis génère une réponse avec le LLM.

    Si document_id est fourni, la recherche est limitée
    au document sélectionné.

    Si document_id est None, la recherche est globale.
    """

    return ask_question(
        question=question,
        top_k=top_k,
        document_id=document_id,
    )


# ======================================================
# Lancement du serveur MCP
# ======================================================

if __name__ == "__main__":

    mcp.run()