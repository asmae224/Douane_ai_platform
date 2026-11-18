// pages/admin/Documents.jsx
import Card from "../../components/common/Card";
import DocumentsTable from "../../components/documents/DocumentTable";

const Documents = () => {
    return (
        <div className="space-y-8">
            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Gestion des documents
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Gérez les documents de la plateforme.
                    </p>
                </div>
            </div>

            {/* =========================== */}
            {/* Tableau */}
            {/* =========================== */}
            <Card>
                <DocumentsTable />
            </Card>
        </div>
    );
};

export default Documents;