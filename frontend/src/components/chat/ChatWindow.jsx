import { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
    FiSend,
    FiUser,
    FiCpu,
    FiFileText,
} from "react-icons/fi";

import Button from "../common/Button";
import Input from "../common/Input";
import Alert from "../common/Alert";
import Loader from "../common/Loader";
import EmptyState from "../common/EmptyState";


const ChatWindow = ({
    messages = [],
    loading = false,
    error = "",
    onSend,
}) => {

    const [question, setQuestion] = useState("");


    // ==========================================================
    // Envoi de la question
    // ==========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        const trimmedQuestion = question.trim();

        if (!trimmedQuestion || loading) {
            return;
        }

        await onSend(trimmedQuestion);

        setQuestion("");
    };


    // ==========================================================
    // Gestion de la touche Entrée
    // ==========================================================

    const handleKeyDown = (event) => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();

            handleSubmit(event);
        }
    };


    // ==========================================================
    // Affichage des sources
    // ==========================================================

    const renderSources = (sources) => {

        if (!sources || sources.length === 0) {
            return null;
        }

        /*
         * Le backend retourne actuellement :
         *
         * [
         *   [
         *      {...},
         *      {...}
         *   ]
         * ]
         *
         * On aplati donc le tableau.
         */

        const flattenedSources = sources.flat();

        // Éviter d'afficher plusieurs fois le même document
        const uniqueSources = flattenedSources.filter(
            (source, index, array) =>
                index ===
                array.findIndex(
                    (item) =>
                        item.document_id === source.document_id &&
                        item.filename === source.filename
                )
        );


        return (
            <div className="mt-4 pt-4 border-t border-gray-200">

                <div className="flex items-center gap-2 mb-3">

                    <FiFileText
                        size={16}
                        className="text-gray-500"
                    />

                    <span
                        className="
                            text-xs
                            font-semibold
                            text-gray-600
                            uppercase
                            tracking-wide
                        "
                    >
                        Sources
                    </span>

                </div>


                <div className="space-y-2">

                    {uniqueSources.map(
                        (source, index) => (

                            <div
                                key={
                                    `${source.document_id}-${source.filename}-${index}`
                                }
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-2
                                    rounded-lg
                                    bg-gray-50
                                    border
                                    border-gray-100
                                "
                            >

                                <FiFileText
                                    size={15}
                                    className="text-blue-600 shrink-0"
                                />

                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-xs
                                            font-medium
                                            text-gray-700
                                            truncate
                                        "
                                    >
                                        {source.filename ||
                                            source.source ||
                                            "Document"}
                                    </p>

                                   

                                </div>

                            </div>
                        )
                    )}

                </div>

            </div>
        );
    };


    // ==========================================================
    // Rendu
    // ==========================================================

    return (
        <div
            className="
                flex
                flex-col
                h-full
                bg-gray-50
                rounded-2xl
                border
                border-gray-200
                overflow-hidden
            "
        >

            {/* ==================================================
                Zone des messages
            ================================================== */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-6
                    py-6
                "
            >

                {messages.length === 0 && !loading ? (

                    <EmptyState
                        title="Commencez une conversation"
                        message="
                            Posez votre question pour rechercher
                             rapidement les informations pertinentes.
                        "
                    />

                ) : (

                    <div
                        className="
                            max-w-4xl
                            mx-auto
                            space-y-6
                        "
                    >

                        {messages.map((message) => {

                            const isUser =
                                message.role === "user";

                            return (
                                <div
                                    key={message.id}
                                    className={`
                                        flex
                                        gap-3
                                        ${
                                            isUser
                                                ? "justify-end"
                                                : "justify-start"
                                        }
                                    `}
                                >

                                    {/* Avatar assistant */}

                                    {!isUser && (
                                        <div
                                            className="
                                                shrink-0
                                                w-9
                                                h-9
                                                rounded-full
                                                bg-blue-100
                                                text-blue-600
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            <FiCpu size={18} />
                                        </div>
                                    )}


                                    {/* Message */}

                                    <div
                                        className={`
                                            max-w-[75%]
                                            rounded-2xl
                                            px-5
                                            py-4
                                            shadow-sm
                                            ${
                                                isUser
                                                    ? `
                                                        bg-blue-600
                                                        text-white
                                                        rounded-br-md
                                                    `
                                                    : `
                                                        bg-white
                                                        border
                                                        border-gray-200
                                                        text-gray-800
                                                        rounded-bl-md
                                                    `
                                            }
                                        `}
                                    >

                                        <div className="flex items-center gap-2 mb-2">

                                            {!isUser && (
                                                <span
                                                    className="
                                                        text-xs
                                                        font-semibold
                                                        text-blue-600
                                                    "
                                                >
                                                    RAG Agent
                                                </span>
                                            )}

                                            {isUser && (
                                                <span
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-1.5
                                                        text-xs
                                                        font-medium
                                                        text-blue-100
                                                    "
                                                >
                                                    <FiUser size={13} />
                                                    Vous
                                                </span>
                                            )}

                                        </div>


                                       <div
    className="
        text-sm
        leading-6
        break-words
        prose
        prose-sm
        max-w-none
    "
>
    <ReactMarkdown>
        {message.content}
    </ReactMarkdown>
</div>


                                        {/* Sources */}

                                        {!isUser &&
                                            renderSources(
                                                message.sources
                                            )}

                                    </div>


                                    {/* Avatar utilisateur */}

                                    {isUser && (
                                        <div
                                            className="
                                                shrink-0
                                                w-9
                                                h-9
                                                rounded-full
                                                bg-blue-600
                                                text-white
                                                flex
                                                items-center
                                                justify-center
                                            "
                                        >
                                            <FiUser size={18} />
                                        </div>
                                    )}

                                </div>
                            );
                        })}


                        {/* ==================================================
                            Chargement
                        ================================================== */}

                        {loading && (
                            <div className="flex items-start gap-3">

                                <div
                                    className="
                                        shrink-0
                                        w-9
                                        h-9
                                        rounded-full
                                        bg-blue-100
                                        text-blue-600
                                        flex
                                        items-center
                                        justify-center
                                    "
                                >
                                    <FiCpu size={18} />
                                </div>

                                <div
                                    className="
                                        bg-white
                                        border
                                        border-gray-200
                                        rounded-2xl
                                        rounded-bl-md
                                        px-5
                                        py-3
                                    "
                                >

                                    <Loader
                                        message="
                                            Analyse des documents...
                                        "
                                    />

                                </div>

                            </div>
                        )}

                    </div>
                )}


                {/* ==================================================
                    Erreur
                ================================================== */}

                {error && (
                    <div className="max-w-4xl mx-auto mt-5">

                        <Alert
                            type="error"
                            message={error}
                        />

                    </div>
                )}

            </div>


            {/* ==================================================
                Zone de saisie
            ================================================== */}

            <div
                className="
                    bg-white
                    border-t
                    border-gray-200
                    px-6
                    py-5
                "
            >

                <form
                    onSubmit={handleSubmit}
                    className="
                        max-w-4xl
                        mx-auto
                    "
                >

                    <div className="flex items-end gap-3">

                        <div className="flex-1">

                            <Input
                                name="question"
                                value={question}
                                onChange={(event) =>
                                    setQuestion(event.target.value)
                                }
                                onKeyDown={handleKeyDown}
                                placeholder="Posez votre question..."
                                disabled={loading}
                                autoComplete="off"
                                aria-label="Question"
                            />

                        </div>


                        <Button
                            type="submit"
                            disabled={
                                loading ||
                                !question.trim()
                            }
                            className="
                                shrink-0
                                px-5
                                py-3
                            "
                        >

                            <FiSend
                                size={18}
                                className="mr-2"
                            />

                            Envoyer

                        </Button>

                    </div>


                </form>

            </div>

        </div>
    );
};


export default ChatWindow;