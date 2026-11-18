import api from "../api/api";

const authService = {

    async login(credentials) {

        const response = await api.post(
            "/auth/login",
            credentials
        );

        return response.data;
    },

    async getCurrentUser() {

        const response = await api.get(
            "/auth/me"
        );

        return response.data;
    },

    async activateAccount(token) {

        const response = await api.get(
            `/auth/activate/${token}`
        );

        return response.data;
    },

    async setPassword(token, newPassword) {

        const response = await api.post(
            "/auth/set-password",
            {
                token,
                new_password: newPassword,
            }
        );

        return response.data;
    },

};

export default authService;