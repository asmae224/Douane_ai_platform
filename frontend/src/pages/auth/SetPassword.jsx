import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import authService from "../../services/authService";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

const SetPassword = () => {

    const { token } = useParams();

    const navigate = useNavigate();

    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {

        setApiError("");

        try {

            await authService.setPassword(
                token,
                data.password,
            );

            navigate("/activation-success");

        } catch (error) {

            setApiError(

                error.response?.data?.detail ||

                "Impossible d'enregistrer le mot de passe."

            );

        }

    };

    return (

        <main className="min-h-screen flex">

            {/* Partie gauche */}

            <section
                className="
                    hidden
                    lg:flex
                    w-1/2
                    bg-slate-900
                    text-white
                    flex-col
                    justify-center
                    px-20
                "
            >

                <div className="max-w-xl">

                    <span
                        className="
                            inline-block
                            rounded-full
                            bg-blue-600/20
                            text-blue-300
                            px-4
                            py-2
                            text-sm
                            font-medium
                            mb-8
                        "
                    >
                        Activation du compte
                    </span>

                    <h1
                        className="
                            text-5xl
                            font-bold
                            leading-tight
                        "
                    >
                        Définissez
                        <br />
                        votre mot
                        <br />
                        de passe
                    </h1>

                    <p
                        className="
                            mt-8
                            text-lg
                            leading-8
                            text-slate-300
                        "
                    >
                        Votre compte est presque prêt.
                        Choisissez un mot de passe sécurisé
                        afin d'accéder à la plateforme.
                    </p>

                </div>

            </section>

            {/* Partie droite */}

            <section
                className="
                    w-full
                    lg:w-1/2
                    bg-slate-100
                    flex
                    items-center
                    justify-center
                    px-8
                "
            >

                <div
                    className="
                        w-full
                        max-w-md
                        bg-white
                        rounded-2xl
                        shadow-xl
                        border
                        border-gray-200
                        p-10
                    "
                >

                    <h2
                        className="
                            text-3xl
                            font-bold
                            text-gray-900
                        "
                    >
                        Nouveau mot de passe
                    </h2>

                    <p className="mt-3 text-gray-500">

                        Choisissez un mot de passe sécurisé.

                    </p>

                    {apiError && (

                        <div
                            className="
                                mt-6
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                                text-sm
                                text-red-700
                            "
                        >

                            {apiError}

                        </div>

                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-8 space-y-6"
                    >

                        <Input
                            label="Mot de passe"
                            type="password"
                            placeholder="********"
                            error={errors.password?.message}
                            {...register("password", {
                                required: "Le mot de passe est obligatoire",
                                minLength: {
                                    value: 8,
                                    message: "Minimum 8 caractères",
                                },
                            })}
                        />

                        <Input
                            label="Confirmer le mot de passe"
                            type="password"
                            placeholder="********"
                            error={errors.confirmPassword?.message}
                            {...register("confirmPassword", {
                                required: "Confirmation obligatoire",
                                validate: (value) =>
                                    value === watch("password")
                                    || "Les mots de passe ne correspondent pas",
                            })}
                        />

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full"
                        >

                            {isSubmitting
                                ? "Enregistrement..."
                                : "Enregistrer le mot de passe"}

                        </Button>

                    </form>

                </div>

            </section>

        </main>

    );

};

export default SetPassword;