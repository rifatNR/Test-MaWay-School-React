import React, {useContext } from 'react'
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const authContext = useContext(AuthContext)
    const { isAuth }= authContext

    return (
        <Route { ...rest } render = {(props) => !isAuth ? (
            <Redirect to="/login" />
        ) : (
            <Component {...props} />
        )} />
    )
}

export default ProtectedRoute
