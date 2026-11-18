import { useNavigate } from "react-router-dom";

import Button from "../../components/common/Button";

const ActivationSuccess = () => {

    const navigate = useNavigate();

    return (

        <main className="min-h-screen flex items-center justify-center bg-slate-100 px-6">

            <div
                className="
                    w-full
                    max-w-lg
                    bg-white
                    rounded-2xl
                    shadow-xl
                    border
                    border-gray-200
                    p-10
                    text-center
                "
            >

                <div className="text-6xl mb-6">

                </div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-gray-900
                    "
                >
                    Compte activé
                </h1>

                <p
                    className="
                        mt-5
                        text-gray-600
                        leading-7
                    "
                >
                    Votre mot de passe a été enregistré avec succès.
                    Votre compte est maintenant actif.
                    Vous pouvez vous connecter à la plateforme.
                </p>

                <Button
                    className="w-full mt-10"
                    onClick={() => navigate("/login")}
                >
                    Aller à la connexion
                </Button>

            </div>

        </main>

    );

};

export default ActivationSuccess;