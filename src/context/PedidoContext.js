import React, { createContext, useEffect, useState } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
    const [pedido, setPedido] = useState(JSON.parse(localStorage.getItem('pedido')) || null);

    useEffect(() => {
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }, [pedido]);

    return (
        <PedidoContext.Provider value={{ pedido, setPedido }}>
            {children}
        </PedidoContext.Provider>
    );
};
