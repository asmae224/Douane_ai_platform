import api from "../api/api";

const userService = {

    // ==========================
    // Liste des utilisateurs
    // ==========================

    getUsers: async () => {

        const response = await api.get("/users");

        return response.data.users;

    },

    // ==========================
    // Détails d'un utilisateur
    // ==========================

    getUser: async (id) => {

        const response = await api.get(`/users/${id}`);

        return response.data;

    },

    // ==========================
    // Création d'un utilisateur
    // ==========================

    createUser: async (userData) => {

        const response = await api.post(
            "/users",
            userData
        );

        return response.data;

    },

    // ==========================
    // Modification d'un utilisateur
    // ==========================

    updateUser: async (id, userData) => {

        const response = await api.put(
            `/users/${id}`,
            userData
        );

        return response.data;

    },

    // ==========================
    // Désactivation d'un utilisateur
    // ==========================

    deleteUser: async (id) => {

        const response = await api.delete(
            `/users/${id}`
        );

        return response.data;

    },

};

export default userService;