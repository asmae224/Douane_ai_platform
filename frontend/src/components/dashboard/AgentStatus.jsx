
import { FiCpu, FiCheckCircle } from "react-icons/fi";
import Card from "../common/Card";
import Badge from "../common/Badge";

const AgentStatus = ({
    indexedDocuments = 0,
}) => {
    return (
        <Card>
            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Assistant documentaire
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    État du service d'intelligence documentaire.
                </p>
            </div>

            {/* =========================== */}
            {/* Agent */}
            {/* =========================== */}

            <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                    {/* Icône */}

                    <div
                        className="
                            flex
                            items-center
                            justify-center
                            w-12
                            h-12
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                        "
                    >
                        <FiCpu size={24} />
                    </div>

                    {/* Informations */}

                    <div>

                        <h3 className="font-semibold text-slate-900">
                            Assistant documentaire
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Agent RAG
                        </p>

                    </div>

                </div>

                {/* Statut */}

                <Badge color="green">
                    <span className="flex items-center gap-1.5">
                        <FiCheckCircle size={14} />
                        Opérationnel
                    </span>
                </Badge>

            </div>

            {/* =========================== */}
            {/* Informations complémentaires */}
            {/* =========================== */}

            <div className="mt-6 pt-5 border-t border-slate-100">

                <div className="flex items-center justify-between">

                    <span className="text-sm text-slate-500">
                        Documents indexés
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                        {indexedDocuments}
                    </span>

                </div>

            </div>

        </Card>
    );
};

export default AgentStatus;

