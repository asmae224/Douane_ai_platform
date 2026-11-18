
import api from "../api/api";

/**
 * Service responsable de la gestion
 * des paramètres de la plateforme.
 */
const platformSettingsService = {

    getSettings: async () => {
        const response = await api.get(
            "/platform-settings"
        );

        return response.data;
    },

    updateSettings: async (data) => {
        const response = await api.put(
            "/platform-settings",
            data
        );

        return response.data;
    },

};

export default platformSettingsService;

