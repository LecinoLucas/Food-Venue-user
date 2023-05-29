//Header.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import CartIcon from './HeaderCart';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
    const [nome] = useState('');
    const [cartItems, setCartItems] = useState(0);


    useEffect(() => {
        setCartItems(0);
    }, []);

    return (
        <header className="bg-primary py-4 shadow-md fixed w-full z-50 top-0">
            <nav className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <NavLink
                        to="/"
                        className="text-white font-semibold text-2xl tracking-wide"
                        activeClassName="font-bold"
                    >
                        Food Venue
                    </NavLink>
                </div>
                <div className="flex items-center">
                    <CartIcon cartItems={cartItems} />
                    <ProfileDropdown restaurantName={nome} />
                </div>
            </nav>
        </header>
    );
};

export default Header;
