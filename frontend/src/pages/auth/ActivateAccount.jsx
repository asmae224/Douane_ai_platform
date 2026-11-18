import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import authService from "../../services/authService";

const ActivateAccount = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        const activate = async () => {

            try {

                await authService.activateAccount(token);

                navigate(`/set-password/${token}`);

            } catch (err) {

                setError(

                    err.response?.data?.detail ||

                    "Lien d'activation invalide."

                );

            } finally {

                setLoading(false);

            }

        };

        activate();

    }, [token, navigate]);

    if (loading) {

        return (

            <main className="min-h-screen flex items-center justify-center bg-slate-100">

                <div className="bg-white rounded-2xl shadow-lg p-10">

                    <p className="text-lg font-medium">

                        Vérification du lien d'activation...

                    </p>

                </div>

            </main>

        );

    }

    if (error) {

        return (

            <main className="min-h-screen flex items-center justify-center bg-slate-100">

                <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md">

                    <h2 className="text-2xl font-bold text-red-600">

                        Activation impossible

                    </h2>

                    <p className="mt-4 text-gray-600">

                        {error}

                    </p>

                </div>

            </main>

        );

    }

    return null;

};

export default ActivateAccount;