import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import CartIcon from './HeaderCart'; // Importe o CartIcon aqui
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
    const history = useHistory();
    const [nome, setNome] = useState('');
    const [cartItems, setCartItems] = useState(0);

    const loggout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }

    useEffect(() => {
        setCartItems(13)
    }, [])

    return (
        <header className="bg-primary py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/"
                        className="text-white font-semibold text-xl"
                        activeClassName="font-bold"
                    >
                        Food Venue
                    </NavLink>

                </div>
                <div className="flex items-center">
                    <CartIcon cartItems={cartItems} />  {/* Adicione o CartIcon aqui */}
                    <ProfileDropdown loggout={loggout} restaurantName={nome} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
