import React from 'react';
import { Navigate } from 'react-router-dom';

function withAuth(Component) {
    return (props) => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Si no hay token, redirigir al usuario a la página de login
            return <Navigate to="/login" replace />;
        }

        // Si hay token, renderizar el componente original con todas sus props
        return <Component {...props} />;
    };
}
export default withAuth