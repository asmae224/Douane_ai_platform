import {
    FiEye,
    FiDownload,
    FiTrash2,
} from "react-icons/fi";

const DocumentActions = ({
    document,
    onView,
    onDownload,
    onDelete,
    isAdmin = false,
}) => {

    return (

        <div className="flex items-center justify-center gap-2">

            {/* Consulter */}

            <button
                onClick={() => onView(document)}
                className="
                    p-2
                    rounded-lg
                    text-blue-600
                    hover:bg-blue-50
                    transition-colors
                "
                title="Consulter"
            >
                <FiEye size={18} />
            </button>

            {/* Télécharger */}

            <button
                onClick={() => onDownload(document)}
                className="
                    p-2
                    rounded-lg
                    text-green-600
                    hover:bg-green-50
                    transition-colors
                "
                title="Télécharger"
            >
                <FiDownload size={18} />
            </button>

            {/* Supprimer (Admin uniquement) */}

            {isAdmin && (

                <button
                    onClick={() => onDelete(document)}
                    className="
                        p-2
                        rounded-lg
                        text-red-600
                        hover:bg-red-50
                        transition-colors
                    "
                    title="Supprimer"
                >
                    <FiTrash2 size={18} />
                </button>

            )}

        </div>

    );

};

export default DocumentActions;