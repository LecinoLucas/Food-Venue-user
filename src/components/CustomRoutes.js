import React, { useContext } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CardContext';
import Carrinho from '../pages/Carrinho';
import Checkout from '../pages/Checkout';
import EditarPerfil from '../pages/EditarPerfil';
import Home from '../pages/Home';
import Login from '../pages/Login';
import PedidoTracker from '../pages/PedidoTracker';
import RestauranteDetail from '../pages/RestauranteDetail';
import Register from '../pages/Singup';
import Header from './Header';
import PrivateRoute from './PrivateRoute';

const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    return token !== null;
}

const CustomRoutes = () => {
    const isAuthenticated = isLoggedIn();
    const location = useLocation();
    const { cartItems } = useContext(CartContext);
    const totalPrice = cartItems.reduce((total, item) => total + item.preco, 0);
    const history = useHistory();

    const redirectToCarrinho = () => {
        history.push('/carrinho')
    }

    return (
        <>
            {location.pathname !== '/' && isAuthenticated && <Header />}
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
                <PrivateRoute path="/restaurante/:id" component={RestauranteDetail} />
                <PrivateRoute path="/carrinho" component={Carrinho} />
                <PrivateRoute path="/editar-perfil" component={EditarPerfil} />
                <PrivateRoute path="/checkout" component={Checkout} />
                <PrivateRoute path="/status-pedido" component={PedidoTracker} />
            </Switch>
            {isAuthenticated && cartItems.length > 0 &&
                location.pathname !== '/carrinho' &&
                location.pathname !== '/editar-perfil' &&
                location.pathname !== '/checkout' &&
                (
                    <div className="fixed left-1/2 transform -translate-x-1/2 bottom-8">
                        <button onClick={redirectToCarrinho} className="flex items-center justify-center px-6 py-2 rounded-full bg-primary text-white shadow-lg hover:bg-secondary transition-colors duration-300">
                            <span className="text-lg">
                                Fechar pedido ({cartItems.length} itens R$ {totalPrice.toFixed(2)})
                            </span>
                        </button>
                    </div>
                )}
        </>
    );
};

export default CustomRoutes;
