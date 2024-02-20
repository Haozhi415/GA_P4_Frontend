import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoute() {
    const { currentUser } = useSelector((state => state.user));

    // if currentUser is truthy, return the Outlet component
    // or else, redirect to the /signin route
    return currentUser ? <Outlet /> : <Navigate to="/signin" />;

}

export default PrivateRoute