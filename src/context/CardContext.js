import React, { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Carregar itens do local storage quando o componente é montado
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('cartItems'));

        if (savedItems?.length > 0) {
            setCartItems(savedItems);
        }
    }, []);

    // Salvar itens no local storage sempre que eles mudam
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, { ...item, uuid: uuidv4() }]);
    };

    const removeFromCart = (itemId) => {
        const itemIndex = cartItems.findIndex((item) => item.uuid === itemId);

        if (itemIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(itemIndex, 1);
            setCartItems(updatedCartItems);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cartItems'); // Remover do armazenamento local
    };
    return (
        <CartContext.Provider value={{ cartItems, setCartItems, removeFromCart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
