
// pages/user/RagAgent.jsx

import { useState } from "react";
import { useLocation } from "react-router-dom";

import Card from "../../components/common/Card";
import ChatWindow from "../../components/chat/ChatWindow";
import chatService from "../../services/chatService";

const RagAgent = () => {
    // ==========================================================
    // État du chat
    // ==========================================================
    const location = useLocation();

    const documentId = location.state?.documentId ?? null;
    const documentName = location.state?.documentName ?? null;

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ==========================================================
    // Envoi d'une question au RAG Agent
    // ==========================================================

    const handleSend = async (question) => {
        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || loading) {
            return;
        }

        // Réinitialiser l'erreur précédente
        setError("");

        // ------------------------------------------------------
        // Message de l'utilisateur
        // ------------------------------------------------------

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: trimmedQuestion,
        };

        setMessages((previousMessages) => [
            ...previousMessages,
            userMessage,
        ]);

        setLoading(true);

        try {
            // --------------------------------------------------
            // Appel du backend
            // --------------------------------------------------

            const result = await chatService.askQuestion(
                trimmedQuestion,
                documentId
            );

            // --------------------------------------------------
            // Réponse du RAG Agent
            // --------------------------------------------------

            const assistantMessage = {
                id: Date.now() + 1,
                role: "assistant",
                content:
                    result?.answer ||
                    "Je n'ai pas pu générer une réponse.",
                sources: result?.sources || [],
            };

            setMessages((previousMessages) => [
                ...previousMessages,
                assistantMessage,
            ]);

        } catch (err) {
            console.error(
                "Erreur lors de l'appel au RAG Agent :",
                err
            );

            const message =
                err?.response?.data?.detail ||
                err?.message ||
                "Une erreur est survenue lors de la communication avec le RAG Agent.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    // ==========================================================
    // Interface
    // ==========================================================

    return (
        <div className="space-y-6">

            {/* ==================================================
                En-tête
            ================================================== */}

            <div>
    <h1 className="text-3xl font-bold text-slate-900">
        Assistant documentaire
    </h1>

    <p className="mt-2 text-slate-500">
        Posez vos questions sur les documents
        administratifs disponibles dans la bibliothèque.
    </p>

    {documentId && documentName && (
        <div className="mt-3 inline-flex items-center gap-2 rounded-lg bg-purple-50 px-3 py-2 text-sm text-purple-700">
            <span className="font-medium">
                Document sélectionné :
            </span>

            <span>
                {documentName}
            </span>
        </div>
    )}
</div>

            {/* ==================================================
                Chat
            ================================================== */}

            <Card>
                <ChatWindow
                    messages={messages}
                    loading={loading}
                    error={error}
                    onSend={handleSend}
                />
            </Card>

        </div>
    );
};

export default RagAgent;

