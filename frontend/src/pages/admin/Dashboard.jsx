
import { useEffect, useState } from "react";
import {
    FiUsers,
    FiUserCheck,
    FiFileText,
} from "react-icons/fi";

import Card from "../../components/common/Card";
import Alert from "../../components/common/Alert";
import Loader from "../../components/common/Loader";

import StatCard from "../../components/dashboard/StatCard";
import UserStatistics from "../../components/dashboard/UserStatistics";
import DocumentStatistics from "../../components/dashboard/DocumentStatistics";
import AgentStatus from "../../components/dashboard/AgentStatus";

import dashboardService from "../../services/dashboardService";


const Dashboard = () => {

    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // Récupération des statistiques
    // =====================================================

    useEffect(() => {

        const loadStatistics = async () => {

            try {

                setLoading(true);
                setError("");

                const data =
                    await dashboardService.getStatistics();

                setStatistics(data);

            } catch (error) {

                console.error(
                    "Erreur lors du chargement du Dashboard :",
                    error
                );

                setError(
                    "Impossible de récupérer les statistiques du Dashboard."
                );

            } finally {

                setLoading(false);

            }

        };

        loadStatistics();

    }, []);


    // =====================================================
    // Chargement
    // =====================================================

    if (loading) {

        return (
            <div className="space-y-8">

                <div>
                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Vue d'ensemble de la plateforme.
                    </p>
                </div>

                <Card>
                    <Loader
                        message="Chargement des statistiques..."
                    />
                </Card>

            </div>
        );

    }


    // =====================================================
    // Erreur
    // =====================================================

    if (error) {

        return (
            <div className="space-y-8">

                <div>
                    <h1
                        className="
                            text-3xl
                            font-bold
                            text-slate-900
                        "
                    >
                        Dashboard
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Vue d'ensemble de la plateforme.
                    </p>
                </div>

                <Alert
                    type="error"
                    message={error}
                />

            </div>
        );

    }


    // =====================================================
    // Sécurité
    // =====================================================

    if (!statistics) {
        return null;
    }


    const {
        users,
        documents,
    } = statistics;


    // =====================================================
    // Dashboard
    // =====================================================

    return (

        <div className="space-y-8">

            {/* ================================================= */}
            {/* En-tête */}
            {/* ================================================= */}

            <div>

                <h1
                    className="
                        text-3xl
                        font-bold
                        text-slate-900
                    "
                >
                    Dashboard
                </h1>

                <p
                    className="
                        mt-2
                        text-slate-500
                    "
                >
                    Vue d'ensemble de la plateforme.
                </p>

            </div>


            {/* ================================================= */}
            {/* Statistiques principales */}
            {/* ================================================= */}

            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-6
                "
            >

                <StatCard
                    title="Utilisateurs"
                    value={users.total}
                    subtitle={`${users.active} actifs`}
                    icon={
                        <FiUsers size={24} />
                    }
                    iconClassName="text-blue-600"
                />


                <StatCard
                    title="Utilisateurs actifs"
                    value={users.active}
                    subtitle={`${users.inactive} inactifs`}
                    icon={
                        <FiUserCheck size={24} />
                    }
                    iconClassName="text-green-600"
                />


                <StatCard
                    title="Documents"
                    value={documents.total}
                    subtitle={`${documents.indexed} indexés`}
                    icon={
                        <FiFileText size={24} />
                    }
                    iconClassName="text-purple-600"
                />

            </div>


            {/* ================================================= */}
            {/* Statistiques détaillées */}
            {/* ================================================= */}

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                "
            >

                <UserStatistics
                    total={users.total}
                    active={users.active}
                    inactive={users.inactive}
                />


                <DocumentStatistics
                    total={documents.total}
                    uploaded={documents.uploaded}
                    indexed={documents.indexed}
                    failed={documents.failed}
                />

            </div>


            {/* ================================================= */}
            {/* État de l'agent */}
            {/* ================================================= */}

            <AgentStatus
                indexedDocuments={documents.indexed}
            />

        </div>

    );
};


export default Dashboard;

