import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../App'

const PrivateRoute = ({ requiredRole, children }) => {
    const { user } = useContext(UserContext);
    console.log(user)

    if (user && user.role === requiredRole) {
        return children; // Render the children components if the user role matches
    }

    return <Navigate to="/" />; // Redirect to the home page if role does not match
};

export default PrivateRoute;
