import Card from "../common/Card";

const UserStatistics = ({
    total = 0,
    active = 0,
    inactive = 0,
}) => {
    const activePercentage =
        total > 0
            ? ((active / total) * 100).toFixed(1)
            : "0.0";

    const inactivePercentage =
        total > 0
            ? ((inactive / total) * 100).toFixed(1)
            : "0.0";

    return (
        <Card>
            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}

            <div className="mb-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Répartition des utilisateurs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Vue d'ensemble des comptes utilisateurs.
                </p>
            </div>

            {/* =========================== */}
            {/* Statistiques */}
            {/* =========================== */}

            <div className="space-y-6">

                {/* Utilisateurs actifs */}

                <div>
                    <div className="flex items-center justify-between mb-2">

                        <span className="text-sm font-medium text-slate-700">
                            Actifs
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                            {active}{" "}
                            <span className="font-normal text-slate-500">
                                ({activePercentage}%)
                            </span>
                        </span>

                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{
                                width: `${activePercentage}%`,
                            }}
                        />

                    </div>
                </div>

                {/* Utilisateurs inactifs */}

                <div>
                    <div className="flex items-center justify-between mb-2">

                        <span className="text-sm font-medium text-slate-700">
                            Inactifs
                        </span>

                        <span className="text-sm font-semibold text-slate-900">
                            {inactive}{" "}
                            <span className="font-normal text-slate-500">
                                ({inactivePercentage}%)
                            </span>
                        </span>

                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">

                        <div
                            className="h-full bg-slate-400 rounded-full transition-all duration-500"
                            style={{
                                width: `${inactivePercentage}%`,
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
                        Total des utilisateurs
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                        {total}
                    </span>

                </div>

            </div>

        </Card>
    );
};

export default UserStatistics;