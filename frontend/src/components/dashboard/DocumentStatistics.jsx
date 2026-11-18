import Card from "../common/Card";

const DocumentStatistics = ({
total = 0,
indexed = 0,
failed = 0,
}) => {
const indexedPercentage =
total > 0
? ((indexed / total) * 100).toFixed(1)
: "0.0";


const failedPercentage =
    total > 0
        ? ((failed / total) * 100).toFixed(1)
        : "0.0";

return (
    <Card>
        {/* =========================== */}
        {/* En-tête */}
        {/* =========================== */}

        <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">
                État des documents
            </h2>

            <p className="mt-1 text-sm text-slate-500">
                Suivi de l'indexation des documents de la plateforme.
            </p>
        </div>

        {/* =========================== */}
        {/* Documents indexés */}
        {/* =========================== */}

        <div className="space-y-6">

            <div>
                <div className="flex items-center justify-between mb-2">

                    <span className="text-sm font-medium text-slate-700">
                        Indexés
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                        {indexed}{" "}
                        <span className="font-normal text-slate-500">
                            ({indexedPercentage}%)
                        </span>
                    </span>

                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-green-500 rounded-full transition-all duration-500"
                        style={{
                            width: `${indexedPercentage}%`,
                        }}
                    />

                </div>
            </div>

            {/* =========================== */}
            {/* Documents en échec */}
            {/* =========================== */}

            <div>
                <div className="flex items-center justify-between mb-2">

                    <span className="text-sm font-medium text-slate-700">
                        Échecs
                    </span>

                    <span className="text-sm font-semibold text-slate-900">
                        {failed}{" "}
                        <span className="font-normal text-slate-500">
                            ({failedPercentage}%)
                        </span>
                    </span>

                </div>

                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-red-500 rounded-full transition-all duration-500"
                        style={{
                            width: `${failedPercentage}%`,
                        }}
                    />

                </div>
            </div>

        </div>

        {/* =========================== */}
        {/* Total */}
        {/* =========================== */}

        <div className="mt-6 pt-5 border-t border-slate-100">

            <div className="flex items-center justify-between">

                <span className="text-sm text-slate-500">
                    Total des documents
                </span>

                <span className="text-lg font-bold text-slate-900">
                    {total}
                </span>

            </div>

        </div>

    </Card>
);


};

export default DocumentStatistics;
