
// src/pages/admin/Settings.jsx

import { useEffect, useState } from "react";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Loader from "../../components/common/Loader";
import Alert from "../../components/common/Alert";

import platformSettingsService from "../../services/SettingsService";

const Settings = () => {

    const [settings, setSettings] = useState({
        name: "",
        description: "",
        language: "fr",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [saved, setSaved] = useState(false);


    // ==========================================================
    // Récupération des paramètres
    // ==========================================================

    useEffect(() => {

        const loadSettings = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await platformSettingsService.getSettings();

                setSettings({
                    name: data.name,
                    description: data.description,
                    language: data.language,
                });

            } catch (error) {

                console.error(
                    "Erreur lors du chargement des paramètres :",
                    error
                );

                setError(
                    "Impossible de récupérer les paramètres de la plateforme."
                );

            } finally {

                setLoading(false);

            }

        };

        loadSettings();

    }, []);


    // ==========================================================
    // Modification des champs
    // ==========================================================

    const handleChange = (e) => {

        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });

        setSaved(false);
        setError("");

    };


    // ==========================================================
    // Enregistrement
    // ==========================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setSaved(false);
            setError("");

            const data =
                await platformSettingsService.updateSettings(
                    settings
                );

            setSettings({
                name: data.name,
                description: data.description,
                language: data.language,
            });

            setSaved(true);

        } catch (error) {

            console.error(
                "Erreur lors de l'enregistrement :",
                error
            );

            setError(
                "Impossible d'enregistrer les paramètres."
            );

        } finally {

            setSaving(false);

        }

    };


    // ==========================================================
    // Chargement
    // ==========================================================

    if (loading) {

        return (
            <div className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold text-slate-900">
                        Paramètres
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Configurez les préférences générales de la plateforme.
                    </p>

                </div>

                <Card>

                    <Loader message="Chargement des paramètres..." />

                </Card>

            </div>
        );

    }


    return (

        <div className="space-y-8">

            {/* =========================== */}
            {/* En-tête */}
            {/* =========================== */}

            <div>

                <h1 className="text-3xl font-bold text-slate-900">
                    Paramètres
                </h1>

                <p className="mt-2 text-slate-500">
                    Configurez les préférences générales de la plateforme.
                </p>

            </div>


            {/* =========================== */}
            {/* Erreur */}
            {/* =========================== */}

            {error && (

                <Alert
                    type="error"
                    message={error}
                    onClose={() => setError("")}
                />

            )}


            {/* =========================== */}
            {/* Général */}
            {/* =========================== */}

            <Card>

                <div className="mb-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        ⚙️ Général
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Gérez les informations générales de la plateforme.
                    </p>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Nom */}

                    <Input
                        label="Nom de la plateforme"
                        name="name"
                        value={settings.name}
                        onChange={handleChange}
                    />


                    {/* Description */}

                    <div>

                        <label
                            htmlFor="description"
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-gray-700
                            "
                        >
                            Description
                        </label>

                        <textarea
                            id="description"
                            name="description"
                            value={settings.description}
                            onChange={handleChange}
                            rows={3}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-gray-900
                                outline-none
                                transition
                                duration-200
                                resize-none
                                focus:border-blue-600
                                focus:ring-2
                                focus:ring-blue-100
                            "
                        />

                    </div>


                    {/* Langue */}

                    <div>

                        <label
                            htmlFor="language"
                            className="
                                block
                                mb-2
                                text-sm
                                font-medium
                                text-gray-700
                            "
                        >
                            Langue
                        </label>

                        <select
                            id="language"
                            name="language"
                            value={settings.language}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-xl
                                border
                                border-gray-300
                                bg-white
                                px-4
                                py-3
                                text-gray-900
                                outline-none
                                transition
                                duration-200
                                focus:border-blue-600
                                focus:ring-2
                                focus:ring-blue-100
                            "
                        >

                            <option value="fr">
                                Français
                            </option>

                            <option value="en">
                                English
                            </option>

                            <option value="ar">
                                العربية
                            </option>

                        </select>

                    </div>


                    {/* Action */}

                    <div className="flex justify-end pt-2">

                        <Button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "Enregistrement..."
                                : "Enregistrer"
                            }
                        </Button>

                    </div>

                </form>


                {/* Succès */}

                {saved && (

                    <div className="mt-4">

                        <Alert
                            type="success"
                            message="Les paramètres ont été enregistrés avec succès."
                        />

                    </div>

                )}

            </Card>


            {/* =========================== */}
            {/* Fonctionnalités */}
            {/* =========================== */}

            <Card>

                <div className="mb-6">

                    <h2 className="text-lg font-semibold text-slate-900">
                        🤖 Fonctionnalités
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        État des principales fonctionnalités disponibles.
                    </p>

                </div>


                <div className="divide-y divide-slate-100">

                    {/* Assistant documentaire */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            py-4
                        "
                    >

                        <div>

                            <p className="text-sm font-medium text-slate-800">
                                Assistant documentaire
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Assistant basé sur la recherche documentaire.
                            </p>

                        </div>

                        <Badge color="green">
                            Disponible
                        </Badge>

                    </div>


                    {/* Sources */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            py-4
                        "
                    >

                        <div>

                            <p className="text-sm font-medium text-slate-800">
                                Sources des réponses
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Les réponses peuvent être accompagnées
                                de leurs sources documentaires.
                            </p>

                        </div>

                        <Badge color="green">
                            Activées
                        </Badge>

                    </div>

                </div>

            </Card>

        </div>

    );

};

export default Settings;

