import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

import useAuth from "../../hooks/useAuth";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        setApiError("");

        try {
            const currentUser = await login(data);

            if (currentUser.role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/library");
            }
        } catch (error) {
            setApiError(
                error.response?.data?.detail ||
                "Une erreur est survenue lors de la connexion."
            );
        }
    };

    return (
        <main className="min-h-screen flex bg-slate-50">

            {/* =====================================================
                PARTIE GAUCHE — IDENTITÉ DE LA PLATEFORME
            ====================================================== */}

            <section
                className="
                    hidden
                    lg:flex
                    lg:w-1/2
                    relative
                    overflow-hidden
                    bg-slate-950
                    text-white
                    flex-col
                    justify-center
                    px-16
                    xl:px-24
                "
            >

                {/* Décorations discrètes */}

                <div
                    className="
                        absolute
                        -top-32
                        -left-32
                        w-96
                        h-96
                        rounded-full
                        bg-blue-600/10
                        blur-3xl
                    "
                />

                <div
                    className="
                        absolute
                        -bottom-40
                        -right-32
                        w-96
                        h-96
                        rounded-full
                        bg-cyan-500/10
                        blur-3xl
                    "
                />

                <div className="relative z-10 max-w-xl">

                    {/* =================================================
                        LOGO / IDENTITÉ
                    ================================================== */}

                   <div className="flex items-center gap-4 mb-10">

    

{/* =================================================
    LOGO DIGIDOUANE
================================================== */}

<div className="
    flex
    h-12
    w-12
    items-center
    justify-center
    rounded-full
    border-2
    border-blue-400/60
">
    <span className="
        text-2xl
        font-bold
        text-blue-400
        tracking-tight
    ">
        D
    </span>
</div>
    {/* =================================================
        IDENTITÉ
    ================================================== */}

    <div>

        <h2
            className="
                text-2xl
                font-bold
                tracking-tight
                text-white
            "
        >
            DigiDouane
        </h2>

        <p
            className="
                mt-0.5
                text-sm
                text-slate-400
            "
        >
            Intelligence documentaire douanière
        </p>

    </div>

</div>
                    {/* =================================================
                        INSTITUTION
                    ================================================== */}

                    <div
                        className="
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-blue-500/20
                            bg-blue-500/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-blue-300
                            mb-7
                        "
                    >
                        Administration des Douanes et Impôts Indirects
                    </div>

                    {/* =================================================
                        TITRE
                    ================================================== */}

                    <h1
    className="
        text-3xl
        xl:text-4xl
        font-bold
        tracking-tight
        leading-tight
    "
>
    Plateforme d'Intelligence
    <span className="block text-blue-400">
        Documentaire Douanière
    </span>
</h1>

                    {/* =================================================
                        DESCRIPTION
                    ================================================== */}

                    <p
                        className="
                            mt-7
                            text-base
                            xl:text-lg
                            leading-8
                            text-slate-300
                            max-w-lg
                        "
                    >
                        Une plateforme intelligente dédiée à la recherche,
                        à la consultation et à l'exploitation des circulaires douanières.
                    </p>

                    {/* =================================================
                        AGENT DISPONIBLE
                    ================================================== */}

                    <div className="mt-10">

                        <p
                            className="
                                text-xs
                                uppercase
                                tracking-widest
                                font-semibold
                                text-slate-500
                                mb-4
                            "
                        >
                            Fonctionnalité disponible
                        </p>

                        <div
                            className="
                                flex
                                items-start
                                gap-4
                                rounded-2xl
                                border
                                border-slate-800
                                bg-slate-900/70
                                p-5
                                max-w-lg
                            "
                        >

                            {/* Icône */}

                            <div
                                className="
                                    flex-shrink-0
                                    w-11
                                    h-11
                                    rounded-xl
                                    bg-blue-600/15
                                    border
                                    border-blue-500/20
                                    flex
                                    items-center
                                    justify-center
                                    text-blue-400
                                "
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 7h6M9 11h6M9 15h4"
                                    />
                                </svg>
                            </div>

                            <div>

                                <h3
                                    className="
                                        font-semibold
                                        text-white
                                    "
                                >
                                    Assistant Documentaire
                                </h3>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        leading-6
                                        text-slate-400
                                    "
                                >
                                    Recherche intelligente et réponses
                                    contextualisées à partir des circulaires
                                     douaniers.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        SÉCURITÉ
                    ================================================== */}

                    <div
                        className="
                            mt-10
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-slate-500
                        "
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4Z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9.5 12l1.7 1.7 3.5-3.5"
                            />
                        </svg>

                        <span>
                            Plateforme sécurisée · Accès réservé
                        </span>

                    </div>

                </div>

            </section>

            {/* =====================================================
                PARTIE DROITE — CONNEXION
            ====================================================== */}

            <section
                className="
                    w-full
                    lg:w-1/2
                    min-h-screen
                    flex
                    items-center
                    justify-center
                    px-6
                    py-10
                    bg-slate-50
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                    "
                >

                    {/* Logo mobile */}

                    <div
                        className="
                            flex
                            lg:hidden
                            items-center
                            justify-center
                            gap-3
                            mb-10
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-600
                                flex
                                items-center
                                justify-center
                                text-white
                                font-bold
                                text-xl
                            "
                        >
                            D
                        </div>

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                DigiDouane
                            </h2>

                            <p className="text-xs text-slate-500">
                                Intelligence documentaire
                            </p>

                        </div>

                    </div>

                    {/* =================================================
                        CARD DE CONNEXION
                    ================================================== */}

                    <div
                        className="
                            bg-white
                            rounded-2xl
                            border
                            border-slate-200
                            shadow-sm
                            p-8
                            sm:p-10
                        "
                    >

                        {/* En-tête */}

                        <div>


                            <h2
                                className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                "
                            >
                                Connexion
                            </h2>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-slate-500
                                "
                            >
                                Accédez à votre espace de travail.
                            </p>

                        </div>

                        {/* =================================================
                            ERREUR API
                        ================================================== */}

                        {apiError && (

                            <div
                                className="
                                    mt-6
                                    rounded-xl
                                    border
                                    border-red-200
                                    bg-red-50
                                    px-4
                                    py-3
                                    text-sm
                                    leading-5
                                    text-red-700
                                "
                            >
                                {apiError}
                            </div>

                        )}

                        {/* =================================================
                            FORMULAIRE
                        ================================================== */}

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 space-y-6"
                        >

                            <Input
                                label="Adresse e-mail"
                                type="email"
                                placeholder="Entrez votre adresse e-mail"
                                error={errors.email?.message}
                                {...register("email", {
                                    required:
                                        "L'adresse e-mail est obligatoire",
                                })}
                            />

                            <Input
                                label="Mot de passe"
                                type="password"
                                placeholder="Entrez votre mot de passe"
                                error={errors.password?.message}
                                {...register("password", {
                                    required:
                                        "Le mot de passe est obligatoire",
                                })}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full"
                            >
                                {isSubmitting
                                    ? "Connexion..."
                                    : "Se connecter"}
                            </Button>

                        </form>

                        {/* =================================================
                            INFORMATION SÉCURITÉ
                        ================================================== */}

                        <div
                            className="
                                mt-8
                                pt-6
                                border-t
                                border-slate-100
                            "
                        >

                            <div className="flex items-start gap-3">

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    className="
                                        w-5
                                        h-5
                                        flex-shrink-0
                                        text-slate-400
                                        mt-0.5
                                    "
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 3l7 4v5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V7l7-4Z"
                                    />
                                </svg>

                                <p
                                    className="
                                        text-xs
                                        leading-5
                                        text-slate-500
                                    "
                                >
                                    L'accès à cette plateforme est réservé
                                    aux utilisateurs autorisés. Les comptes
                                    sont créés exclusivement par
                                    l'administrateur.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        FOOTER
                    ================================================== */}

                    <p
                        className="
                            mt-6
                            text-center
                            text-xs
                            text-slate-400
                        "
                    >
                        DigiDouane · Plateforme d'Intelligence
                        Documentaire Douanière
                    </p>

                </div>

            </section>

        </main>
    );
};

export default Login;