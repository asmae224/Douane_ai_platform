// components/documents/LibraryTable.jsx
import { useEffect, useState } from "react";
import { FiEye, FiDownload, FiMessageCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Table from "../common/Table";
import Alert from "../common/Alert";
import documentService from "../../services/documentService";

const LibraryTable = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const showNotification = (type, message, duration = 5000) => {
        setNotification({ type, message });
        if (duration > 0) {
            setTimeout(() => {
                setNotification(null);
            }, duration);
        }
    };

    const hideNotification = () => {
        setNotification(null);
    };

    const fetchDocuments = async () => {
        try {
            setLoading(true);
           const data = await documentService.getDocuments();

// Afficher uniquement les documents indexés par le RAG Agent
const indexedDocuments = (data || []).filter(
    (document) => document.status === "INDEXED"
);

setDocuments(indexedDocuments);
        } catch (error) {
            console.error("Erreur lors du chargement des documents:", error);
            showNotification("error", "Impossible de charger la liste des documents.");
            setDocuments([]);
        } finally {
            setLoading(false);
        }
    };

    const handleView = async (document) => {

    try {

        await documentService.viewDocument(document.id);

    }

    catch (error) {

        console.error(error);

    }

};
const handleChat = (document) => {
    navigate("/rag", {
        state: {
            documentId: document.id,
            documentName: document.original_filename,
        },
    });
};

   const handleDownload = async (document) => {

    try {

       await documentService.downloadDocument(
    document.id,
    document.original_filename
);

    }

    catch (error) {

        console.error(error);

    }

};

    // ✅ Vérification que documents est bien un tableau
    const filteredDocuments = Array.isArray(documents) 
        ? documents.filter((document) => {
            if (!search.trim()) return true;
            const keyword = search.trim().toLowerCase();
            return document.original_filename.toLowerCase().includes(keyword);
        })
        : [];

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-slate-600">Chargement des documents...</span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {notification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert
                        type={notification.type}
                        message={notification.message}
                        onClose={hideNotification}
                    />
                </div>
            )}

            <div className="w-full md:w-96">
                <Input
                    placeholder="Rechercher un document..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="text-sm text-slate-500">
                {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''}
            </div>

            <Table>
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Nom du document
                        </th>
                        <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.length === 0 ? (
                        <tr>
                            <td
                                colSpan={2}
                                className="px-6 py-12 text-center text-slate-500"
                            >
                                {search ? "Aucun document ne correspond à votre recherche." : "Aucun document trouvé."}
                            </td>
                        </tr>
                    ) : (
                        filteredDocuments.map((document) => (
                            <tr
                                key={document.id}
                                className="border-t border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {document.original_filename}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleView(document)}
                                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Voir"
                                        >
                                            <FiEye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(document)}
                                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                                            title="Télécharger"
                                        >
                                            <FiDownload size={18} />
                                        </button>
                                        <button
    onClick={() => handleChat(document)}
    className="p-2 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors"
    title="Discuter avec ce document"
>
    <FiMessageCircle size={18} />
</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default LibraryTable;