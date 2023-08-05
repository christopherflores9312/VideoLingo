import React, { useContext } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const navigate = useNavigate();
    const { authToken } = useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                authToken ? (
                    <Component {...props} />
                ) : (
                    <navigate to="/login" />
                )
            }
        />
    );
};

export default ProtectedRoute;
