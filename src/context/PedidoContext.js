import React, { createContext, useEffect, useState } from 'react';

export const PedidoContext = createContext();

export const PedidoProvider = ({ children }) => {
    const [pedido, setPedido] = useState(JSON.parse(localStorage.getItem('pedido')) || null);

    useEffect(() => {
        localStorage.setItem('pedido', JSON.stringify(pedido));
    }, [pedido]);

    const hasPedido = () => {
        const storedPedido = JSON.parse(localStorage.getItem('pedido'));
        if (storedPedido && (storedPedido.status === 'entregue' || storedPedido.status === 'cancelado')) {
            localStorage.removeItem('pedido');
            setPedido(null);
            return false;
        }
        return storedPedido != null;
    };
    const removePedido = () => {
        localStorage.removeItem('pedido');
        setPedido(null);
    };
    return (
        <PedidoContext.Provider value={{ pedido, setPedido, hasPedido, removePedido }}>
            {children}
        </PedidoContext.Provider>
    );
};
