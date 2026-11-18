// pages/user/Library.jsx
import Card from "../../components/common/Card";
import LibraryTable from "../../components/documents/LibraryTable";

const Library = () => {
    return (
        <div className="space-y-8">
            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">
                        Bibliothèque de documents
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Consultez et téléchargez les documents disponibles.
                    </p>
                </div>
            </div>

            {/* =========================== */}
            {/* Tableau */}
            {/* =========================== */}
            <Card>
                <LibraryTable />
            </Card>
        </div>
    );
};

export default Library;