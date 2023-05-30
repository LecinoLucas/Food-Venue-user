import { Alert } from '@mui/material';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import useAxiosInstance from '../utils/axiosInstance';

const PedidosHistorico = () => {
    const [pedidos, setPedidos] = useState([]);
    const axiosInstance = useAxiosInstance();
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            axiosInstance.get(`/api/pedidos/cliente/${user?.id}`)
                .then((response) => {
                    setPedidos(response?.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

    }, [axiosInstance, user]);

    return (
        <div className="bg-app min-h-screen pt-16">
            <main className="p-8 mx-auto">
                <h1 className="text-4xl font-semibold mb-6 text-center text-primary">Histórico de Pedidos</h1>
                <div className="grid justify-items-center items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pedidos.length > 0 ? pedidos.map((pedido) => (
                        <div key={pedido?.id} className="bg-card rounded-lg p-6 w-full min-h-[200px]">
                            <h2 className="text-2xl font-bold text-primary mb-2">{pedido?.restaurante?.nome}</h2>
                            <p className="text-gray-600 mb-2">Pedido feito em {moment(pedido?.dataHora).format('DD/MM/YYYY HH:mm')}</p>
                            <p className="text-gray-600 mb-2">Status: {pedido.status}</p>
                            <ul className="mb-4">
                                {pedido?.itens?.map(item => (
                                    <li key={item?.id}>{item?.prato.nome} - {item.quantidade}x</li>
                                ))}
                            </ul>
                            <p className="text-xl font-bold text-success">Total: R$ {pedido?.itens.reduce((total, item) => total + (item?.prato?.preco * item?.quantidade), 0).toFixed(2)}</p>
                        </div>
                    )) :
                        <div className="flex flex-col justify-center items-center h-full w-full text-center">
                            <Alert severity="info" className="w-full md:w-1/2 text-xl">Você ainda não fez nenhum pedido.</Alert>
                        </div>
                    }
                </div>
            </main>
        </div>
    );
};

export default PedidosHistorico;
