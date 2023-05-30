import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stomp } from '@stomp/stompjs';
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SockJS from 'sockjs-client';
import CustomButton from '../components/CustomButton';
import { PedidoContext } from '../context/PedidoContext';
import { UserContext } from '../context/UserContext';
import useAxiosInstance from '../utils/axiosInstance';

const PedidoTracker = () => {
    const { pedido, setPedido, removePedido } = useContext(PedidoContext);
    const { user } = useContext(UserContext);
    const history = useHistory();
    const axiosInstance = useAxiosInstance();

    const statusSteps = [
        'AGUARDANDO_APROVACAO',
        'PREPARANDO',
        'A_CAMINHO',
        'ENTREGUE',
        'CANCELADO'
    ];

    const [client, setClient] = useState(null);

    useEffect(() => {
        if (user) {
            axiosInstance
                .get(`/api/pedidos/status/${user?.id}`)
                .then((resp) => {
                    setPedido(resp?.data);
                })
                .catch((err) => {
                    if (err.response.status === 404) {
                        removePedido()
                    }
                });
        }
    }, [axiosInstance, user]);


    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/mywebsockets');
        const stompClient = Stomp.over(socket);

        stompClient.connect(
            {
                Authorization: localStorage.getItem('token')
            },
            (frame) => {
                stompClient.subscribe(`/topic/pedidos/${pedido.id}`, (message) => {
                    if (message.body) {
                        try {
                            const parsedBody = JSON.parse(message.body);
                            setPedido(parsedBody);
                        } catch (error) {
                            console.error('Erro ao processar a mensagem:', error);
                        }
                    }
                });
            },
            (error) => {
                console.error('Erro no WebSocket:', error);
            }
        );

        setClient(stompClient);

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Desconectado do WebSocket');
                });
            }
        };
    }, [pedido]);

    const statusDictionary = {
        AGUARDANDO_APROVACAO: 'Aguardando Aprovação',
        PREPARANDO: 'Preparando',
        A_CAMINHO: 'A Caminho',
        ENTREGUE: 'Entregue',
        CANCELADO: 'Cancelado'
    };

    const renderSteps = () => {
        return statusSteps.map((step, index) => {
            let statusClass =
                pedido && index <= statusSteps.indexOf(pedido.status)
                    ? 'bg-success text-white'
                    : 'bg-warning text-white';
            return (
                <div
                    className={`step flex flex-col items-center justify-between mb-4 md:mb-0 flex-grow`}
                    key={index}
                >
                    <div className="step-circle-container w-32 h-10 flex justify-center items-center">
                        <div
                            className={`step-circle w-8 h-8 rounded-full flex justify-center items-center ${statusClass}`}
                        >
                            {index + 1}
                        </div>
                    </div>
                    <div className="step-label mt-2 font-bold text-center text-secondary">
                        {statusDictionary[step]}
                    </div>
                </div>
            );
        });
    };

    const renderPedidoItems = () => {
        return (
            pedido.itens?.map((item, index) => (
                <div
                    key={index}
                    className="flex font-semibold justify-between mb-2 p-2 border-b-2 border-gray-200"
                >
                    <div className="text-secondary text-lg">{item?.prato?.nome}</div>
                    <div className="text-primary text-lg">${item?.prato?.preco}</div>
                </div>
            )) || null
        );
    };

    const redirectToHome = () => {
        history.push('/home')
    }

    return (
        <div className="bg-app min-h-screen pt-16 flex flex-col justify-center items-center">
            <div className="bg-card p-4 rounded-lg mb-4 shadow-2xl max-w-2xl w-full">
                <h2 className="text-3xl font-semibold mb-4 text-primary text-center">
                    Acompanhamento de Pedido
                </h2>
                {pedido && (
                    <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">
                            Pedido #{pedido.id}
                        </h3>
                        <div className="bg-white shadow-md rounded p-4 mb-4">
                            {renderPedidoItems()}
                        </div>
                        <div className="stepper flex flex-col md:flex-row justify-around items-center mt-4 mb-4">
                            {renderSteps()}
                        </div>
                        {pedido.status === 'ENTREGUE' && (
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <CheckCircleIcon style={{ fontSize: 60 }} className="text-success" />
                                <p className="text-lg font-semibold">
                                    Seu pedido foi entregue com sucesso!
                                </p>
                                <p className="text-secondary">
                                    Clique no botão abaixo para voltar para a home e se deliciar pedindo mais.
                                </p>
                                <CustomButton onClick={redirectToHome} color="primary" className="my-4">
                                    Voltar para a Home
                                </CustomButton>
                            </div>
                        )}
                        {pedido.status === 'CANCELADO' && (
                            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                                <CancelIcon style={{ fontSize: 60 }} className="text-warning" />
                                <p className="text-lg font-semibold">
                                    Infelizmente o restaurante precisou cancelar seu pedido.
                                </p>
                                <p className="text-secondary">
                                    Clique no botão abaixo e fique à vontade para voltar ao início e pedir mais.
                                </p>
                                <CustomButton onClick={redirectToHome} color="primary" className="my-4">
                                    Voltar para a Home
                                </CustomButton>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );

};

export default PedidoTracker;
