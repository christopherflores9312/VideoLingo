import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    // If the user is not authenticated, redirect to the login page
    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
