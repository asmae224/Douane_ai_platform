import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({
    children,
    allowedRoles = [],
}) => {

    const {
        user,
        isAuthenticated,
    } = useAuth();

    // Utilisateur non connecté
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // Profil pas encore chargé
    if (!user) {
        return null;
    }

    // Vérification du rôle
    if (
        allowedRoles.length > 0 &&
        !allowedRoles.includes(user.role)
    ) {

        return <Navigate to="/login" replace />;

    }

    return children;

};

export default ProtectedRoute;