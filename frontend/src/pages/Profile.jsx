import useAuth from "../hooks/useAuth";

import Card from "../components/common/Card";

const Profile = () => {

    const {
        user,
        loading,
    } = useAuth();

    if (loading) {

        return (

            <div
                className="
                    flex
                    items-center
                    justify-center
                    h-full
                "
            >

                <p className="text-slate-500">

                    Chargement du profil...

                </p>

            </div>

        );

    }

    if (!user) {

        return (

            <div
                className="
                    flex
                    items-center
                    justify-center
                    h-full
                "
            >

                <p className="text-red-600">

                    Impossible de charger le profil.

                </p>

            </div>

        );

    }

    const initials =
        `${user.first_name[0]}${user.last_name[0]}`.toUpperCase();

    const fullName =
        `${user.first_name} ${user.last_name}`;

    const createdAt =
        new Date(user.created_at).toLocaleDateString(
            "fr-FR",
            {
                day: "numeric",
                month: "long",
                year: "numeric",
            }
        );

    return (

        <div
            className="
                max-w-4xl
                mx-auto
                space-y-8
            "
        >

            {/* ===================== */}
            {/* Titre */}
            {/* ===================== */}

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-slate-900
                    "
                >
                    Mon Profil
                </h1>

                <p
                    className="
                        mt-2
                        text-slate-500
                    "
                >
                    Consultez les informations de votre compte.
                </p>

            </div>

            {/* ===================== */}
            {/* Carte identité */}
            {/* ===================== */}

            <Card>

                <div
                    className="
                        flex
                        flex-col
                        items-center
                        py-10
                    "
                >

                    <div
                        className="
                            w-28
                            h-28

                            rounded-full

                            bg-gradient-to-br
                            from-blue-600
                            to-indigo-700

                            flex
                            items-center
                            justify-center

                            text-white
                            text-4xl
                            font-bold

                            shadow-lg

                            select-none
                        "
                    >

                        {initials}

                    </div>

                    <h2
                        className="
                            mt-6
                            text-2xl
                            font-bold
                            text-slate-900
                        "
                    >

                        {fullName}

                    </h2>

                    <p
                        className="
                            mt-2
                            text-slate-500
                        "
                    >

                        {user.email}

                    </p>

                </div>

            </Card>

            {/* ===================== */}
            {/* Informations */}
            {/* ===================== */}

            <Card>

                <div
                    className="
                        p-8
                    "
                >

                    <h3
                        className="
                            text-xl
                            font-semibold
                            text-slate-900
                            mb-8
                        "
                    >
                        Informations personnelles
                    </h3>

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-6
                        "
                    >

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-500
                                    mb-2
                                "
                            >
                                Prénom
                            </label>

                            <div
                                className="
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3
                                    text-slate-800
                                "
                            >
                                {user.first_name}
                            </div>

                        </div>

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-500
                                    mb-2
                                "
                            >
                                Nom
                            </label>

                            <div
                                className="
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3
                                    text-slate-800
                                "
                            >
                                {user.last_name}
                            </div>

                        </div>

                        <div className="md:col-span-2">

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-slate-500
                                    mb-2
                                "
                            >
                                Adresse e-mail
                            </label>

                            <div
                                className="
                                    rounded-lg
                                    border
                                    border-slate-200
                                    bg-slate-50
                                    px-4
                                    py-3
                                    text-slate-800
                                "
                            >
                                {user.email}
                            </div>

                        </div>

                    </div>

                </div>

            </Card>

            {/* ===================== */}
            {/* Compte */}
            {/* ===================== */}

            <Card>

                <div
                    className="
                        p-8
                    "
                >

                    <h3
                        className="
                            text-xl
                            font-semibold
                            text-slate-900
                            mb-8
                        "
                    >
                        Informations du compte
                    </h3>

                    <div
                        className="
                            space-y-5
                        "
                    >

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <span
                                className="
                                    text-slate-500
                                "
                            >
                                Statut
                            </span>

                            <span
                                className={`
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium

                                    ${
                                        user.is_active
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }
                                `}
                            >

                                {
                                    user.is_active
                                        ? "Actif"
                                        : "Désactivé"
                                }

                            </span>

                        </div>

                        <div
                            className="
                                flex
                                justify-between
                                items-center
                            "
                        >

                            <span
                                className="
                                    text-slate-500
                                "
                            >
                                Compte créé le
                            </span>

                            <span
                                className="
                                    text-slate-800
                                    font-medium
                                "
                            >
                                {createdAt}
                            </span>

                        </div>

                    </div>

                </div>

            </Card>

            {/* ===================== */}
            {/* Information */}
            {/* ===================== */}

            <Card>

                <div
                    className="
                        p-6
                        rounded-xl
                        bg-blue-50
                        border
                        border-blue-200
                    "
                >

                    <p
                        className="
                            text-blue-800
                        "
                    >

                        Pour toute modification de vos informations personnelles
                        ou de vos accès, veuillez contacter l'administrateur de
                        la plateforme.

                    </p>

                </div>

            </Card>

        </div>

    );

};

export default Profile;