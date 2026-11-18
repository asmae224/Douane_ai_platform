def register_health(mcp):

    @mcp.tool
    def health():

        """
        Vérifie si le RAG Agent fonctionne.
        """

        return {
            "agent": "rag_agent",
            "status": "running",
            "version": "1.0.0",
        }