import { createContext, useEffect, useState } from "react";

import authService from "../services/authService";
import {
    saveToken,
    removeToken,
    hasToken,
} from "../utils/tokenStorage";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const initializeAuth = async () => {

            if (!hasToken()) {

                setLoading(false);

                return;

            }

            try {

                const currentUser =
                    await authService.getCurrentUser();

                setUser(currentUser);

                setIsAuthenticated(true);

            } catch (error) {

                removeToken();

                setUser(null);

                setIsAuthenticated(false);

            } finally {

                setLoading(false);

            }

        };

        initializeAuth();

    }, []);

    const login = async (credentials) => {

        const data = await authService.login(credentials);

        saveToken(data.access_token);

        const currentUser =
            await authService.getCurrentUser();

        setUser(currentUser);

        setIsAuthenticated(true);

        return currentUser;

    };

    const logout = () => {

        removeToken();

        setUser(null);

        setIsAuthenticated(false);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export default AuthProvider;