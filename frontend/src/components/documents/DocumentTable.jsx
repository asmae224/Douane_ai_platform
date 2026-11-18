// components/documents/DocumentsTable.jsx
import { useEffect, useState } from "react";
import { FiEye, FiDownload, FiTrash2, FiAlertTriangle } from "react-icons/fi";
import Modal from "../common/Modal";
import Button from "../common/Button";
import Input from "../common/Input";
import Table from "../common/Table";
import Alert from "../common/Alert";
import DocumentStatusBadge from "./DocumentStatusBadge";
import DocumentActions from "./DocumentActions";
import UploadDocumentModal from "./UploadDocumentModal";
import documentService from "../../services/documentService";

const DocumentsTable = () => {
    const [search, setSearch] = useState("");
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [openUploadModal, setOpenUploadModal] = useState(false);
    const [notification, setNotification] = useState(null);
    
    // États pour la confirmation de suppression
    const [documentToDelete, setDocumentToDelete] = useState(null);
    const [openConfirmModal, setOpenConfirmModal] = useState(false);

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
            setDocuments(data || []);
        } catch (error) {
            console.error("Erreur lors du chargement des documents:", error);
            showNotification("error", "Impossible de charger la liste des documents.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (file) => {
        try {
            setLoadingUpload(true);
            await documentService.uploadDocument(file);
            await fetchDocuments();
            setOpenUploadModal(false);
            showNotification("success", "Document importé avec succès !");
        } catch (error) {
            console.error(error);
            showNotification("error", "Erreur lors de l'importation du document.");
        } finally {
            setLoadingUpload(false);
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
    // Ouvre la modale de confirmation
    const openDeleteConfirmation = (document) => {
        setDocumentToDelete(document);
        setOpenConfirmModal(true);
    };

    // Ferme la modale de confirmation
    const closeDeleteConfirmation = () => {
        setDocumentToDelete(null);
        setOpenConfirmModal(false);
    };

    // Fonction pour supprimer un document
    const handleDeleteDocument = async () => {
        if (!documentToDelete) return;
        
        try {
            await documentService.deleteDocument(documentToDelete.id);
            await fetchDocuments();
            closeDeleteConfirmation();
            showNotification(
                "success", 
                `Le document "${documentToDelete.original_filename}" a été supprimé avec succès.`
            );
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            closeDeleteConfirmation();
            showNotification("error", "Impossible de supprimer le document.");
        }
    };

  const filteredDocuments = documents.filter((document) => {
    if (!search.trim()) return true;

    const keyword = search.trim().toLowerCase();

    return document.original_filename
        .toLowerCase()
        .includes(keyword);
});

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
            {/* Notification globale */}
            {notification && (
                <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
                    <Alert
                        type={notification.type}
                        message={notification.message}
                        onClose={hideNotification}
                    />
                </div>
            )}

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                <div className="w-full md:w-96">
                    <Input
                        placeholder="Rechercher un document..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button
                    onClick={() => setOpenUploadModal(true)}
                    className="whitespace-nowrap"
                >
                    + Importer un document
                </Button>
            </div>

            {/* Indicateur du nombre de documents */}
            <div className="text-sm text-slate-500">
                {filteredDocuments.length} document{filteredDocuments.length > 1 ? 's' : ''}
            </div>

            {/* Table */}
            <Table>
                <thead className="bg-slate-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Nom du document
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Date d'importation
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                            Statut
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
                                colSpan={4}
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
                                <td className="px-6 py-4 text-slate-600">
                                    {new Date(document.uploaded_at).toLocaleDateString("fr-FR", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric"
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    <DocumentStatusBadge status={document.status} />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {/* Voir */}
                                        <button
                                            onClick={() => handleView(document)}
                                            className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                            title="Voir"
                                        >
                                            <FiEye size={18} />
                                        </button>

                                        {/* Télécharger */}
                                        <button
                                            onClick={() => handleDownload(document)}
                                            className="p-2 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                                            title="Télécharger"
                                        >
                                            <FiDownload size={18} />
                                        </button>

                                        {/* Supprimer avec confirmation */}
                                        <button
                                            onClick={() => openDeleteConfirmation(document)}
                                            className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                                            title="Supprimer"
                                        >
                                            <FiTrash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>

            {/* Modal d'importation de document */}
            <UploadDocumentModal
                isOpen={openUploadModal}
                onClose={() => setOpenUploadModal(false)}
                onUpload={handleUpload}
                loading={loadingUpload}
            />

            {/* Modal de Confirmation de suppression */}
            <Modal
                isOpen={openConfirmModal}
                onClose={closeDeleteConfirmation}
                title="Supprimer un document"
            >
                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100">
                            <FiAlertTriangle size={24} className="text-red-600" />
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800">
                                Confirmez-vous la suppression de ce document ?
                            </p>
                            <p className="mt-2 text-sm text-slate-600">
                                Cette action est irréversible. Le document sera définitivement supprimé.
                            </p>
                            {documentToDelete && (
                                <p className="mt-2 text-sm font-medium text-slate-800">
                                    Document : "{documentToDelete.original_filename}"
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t pt-5">
                        <Button
                            variant="secondary"
                            onClick={closeDeleteConfirmation}
                        >
                            Annuler
                        </Button>
                        <Button
                            onClick={handleDeleteDocument}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Confirmer la suppression
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentsTable;