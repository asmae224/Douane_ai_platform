import api from "../api/api";

/**
 * Service de communication avec le Chat / RAG Agent.
 *
 * Flux :
 *
 * React
 *   ↓
 * FastAPI
 *   ↓
 * MCP
 *   ↓
 * RAG Agent
 *   ↓
 * ChromaDB + LLM
 */
const chatService = {

    /**
     * Envoyer une question au RAG Agent.
     *
     * @param {string} question
     * @param {number|null} documentId
     * @returns {Promise<Object>}
     */
    async askQuestion(question, documentId = null) {

        if (!question || !question.trim()) {
            throw new Error(
                "La question ne peut pas être vide."
            );
        }

        const response = await api.post(
            "/chat",
            {
                question: question.trim(),
                document_id: documentId,
            }
        );

        return response.data;
    },
};

export default chatService;