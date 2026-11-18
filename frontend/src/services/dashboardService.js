import api from "../api/api";

/**
 * Service responsable de la récupération
 * des statistiques du Dashboard Administrateur.
 */
const dashboardService = {
    getStatistics: async () => {
        const response = await api.get(
            "/dashboard/statistics"
        );

        return response.data;
    },
};

export default dashboardService;