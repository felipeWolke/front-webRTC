import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function RequireAuth({ children }) {
    const location = useLocation();
    const token = localStorage.getItem('token');

    // Si no hay token, redirige a la página de inicio de sesión
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
export default RequireAuth;