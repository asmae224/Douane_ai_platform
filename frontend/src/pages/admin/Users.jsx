import Card from "../../components/common/Card";

import UsersTable from "../../components/users/UsersTable";

const Users = () => {

    return (

        <div
            className="
                space-y-8
            "
        >

            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Gestion des utilisateurs
                    </h1>

                    <p
                        className="
                            mt-2
                            text-slate-500
                        "
                    >
                        Gérez les comptes utilisateurs de la plateforme.
                    </p>

                </div>

            </div>

            {/* =========================== */}
            {/* Tableau */}
            {/* =========================== */}

            <Card>

                <UsersTable />

            </Card>

        </div>

    );

};

export default Users;