import React, { useContext } from 'react';
import { PedidoContext } from '../context/PedidoContext';

const PedidoTracker = () => {
    const { pedido } = useContext(PedidoContext);
    const statusSteps = [
        'AGUARDANDO_APROVACAO',
        'PREPARANDO',
        'A_CAMINHO',
        'ENTREGUE',
        'CANCELADO'
    ];

    // Dicionário para mostrar os textos dos status de forma mais amigável
    const statusDictionary = {
        AGUARDANDO_APROVACAO: 'Aguardando Aprovação',
        PREPARANDO: 'Preparando',
        A_CAMINHO: 'A Caminho',
        ENTREGUE: 'Entregue',
        CANCELADO: 'Cancelado'
    };

    const renderSteps = () => {
        return statusSteps.map((step, index) => {
            let statusClass = pedido && index <= statusSteps.indexOf(pedido.status) ? 'bg-success text-white' : 'bg-warning text-white';
            return (
                <div className={`step flex flex-col items-center justify-between mb-4 md:mb-0 flex-grow`} key={index}>
                    <div className="step-circle-container w-32 h-10 flex justify-center items-center">
                        <div className={`step-circle w-8 h-8 rounded-full flex justify-center items-center ${statusClass}`}>
                            {index + 1}
                        </div>
                    </div>
                    <div className="step-label mt-2 font-bold text-center text-secondary">{statusDictionary[step]}</div>
                </div>
            );
        });
    };

    const renderPedidoItems = () => {
        return pedido.itens?.map((item, index) => (
            <div key={index} className="flex font-semibold justify-between mb-2 p-2 border-b-2 border-gray-200">
                <div className="text-secondary text-lg">{item?.prato?.nome}</div>
                <div className="text-primary text-lg">${item?.prato?.preco}</div>
            </div>
        ));
    };

    return (
        <div className="bg-app min-h-screen pt-16 flex justify-center items-center">
            <div className="bg-card p-4 rounded-lg mb-4 shadow-2xl">
                <h2 className="text-3xl font-semibold mb-4 text-primary text-center">Acompanhamento de Pedido</h2>
                {pedido && (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Pedido #{pedido.id}</h3>
                        <div className="bg-white shadow-md rounded p-4">
                            {renderPedidoItems()}
                        </div>
                        <div className="stepper flex flex-col md:flex-row justify-around items-center mt-4">
                            {renderSteps()}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PedidoTracker;
