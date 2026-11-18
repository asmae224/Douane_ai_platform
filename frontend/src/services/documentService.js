import api from "../api/api";

const documentService = {

    // ==========================
    // Liste des documents
    // ==========================

    async getDocuments() {

        const response = await api.get("/documents");

        return response.data.documents;

    },

    // ==========================
    // Importer un document
    // ==========================

    async uploadDocument(file) {

        const formData = new FormData();

        formData.append("file", file);

        const response = await api.post(
            "/documents",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return response.data;

    },

    // ==========================
    // Consulter
    // ==========================

    async viewDocument(id) {

        const response = await api.get(
            `/documents/${id}/view`,
            {
                responseType: "blob",
            }
        );

        const url = window.URL.createObjectURL(response.data);

        window.open(url, "_blank");

    },

    // ==========================
    // Télécharger
    // ==========================

    async downloadDocument(id, filename) {

        const response = await api.get(
            `/documents/${id}/download`,
            {
                responseType: "blob",
            }
        );

        // Récupération du vrai nom du fichier
      

        const url = window.URL.createObjectURL(response.data);

        const link = document.createElement("a");

        link.href = url;

        link.download = filename;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    },

    // ==========================
    // Supprimer
    // ==========================

    async deleteDocument(id) {

        const response = await api.delete(
            `/documents/${id}`
        );

        return response.data;

    },

};

export default documentService;