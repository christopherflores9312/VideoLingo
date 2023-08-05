import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ element, requiredLevel, ...rest }) => {
    const auth = useContext(AuthContext);
    const location = useLocation();

    // If the user is not authenticated, redirect to the sign-in page
    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if a required level is specified and compare it with the user's level
    if (requiredLevel !== undefined && auth.user.level < requiredLevel) {
        // Redirect to an unauthorized or access denied page, or show a message
        // Note: Replace "/AccessDenied" with the appropriate route or message
        return <Navigate to="/signup" replace />;
    }

    return <Route {...rest} element={element} />;
};

export default ProtectedRoute;
