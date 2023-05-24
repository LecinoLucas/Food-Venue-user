import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Singup';
import PrivateRoute from './PrivateRoute';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
}

const CustomRoutes = () => {
    const isAuthenticated = isLoggedIn();

    return (
        <>
            <Switch>
                <Route path="/" exact render={() => (
                    isAuthenticated ? (
                        <Redirect to="/home" />
                    ) : (
                        <Login />
                    )
                )} />
                <Route path="/cadastro" component={Register} />
                <PrivateRoute path="/home" component={Home} />
            </Switch>
        </>
    );
};

export default CustomRoutes;
