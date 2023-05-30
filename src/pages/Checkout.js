import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Toast from '../components/Toast';
import { CartContext } from '../context/CardContext';
import { PedidoContext } from '../context/PedidoContext';
import { UserContext } from '../context/UserContext';
import useAxiosInstance from '../utils/axiosInstance';

const Checkout = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const { user } = useContext(UserContext);
    const axiosInstance = useAxiosInstance();
    const [formattedExpirationDate, setFormattedExpirationDate] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('error');
    const [toastTitle, setToastTitle] = useState('');
    const { setPedido } = useContext(PedidoContext);
    const history = useHistory();
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [cardInfo, setCardInfo] = useState({
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const handleCardInfoChange = (event) => {
        const { name, value } = event.target;
        setCardInfo((prevCardInfo) => ({
            ...prevCardInfo,
            [name]: value,
        }));

        if (name === 'expirationDate') {
            let formattedDate = value.replace(/[^0-9]/g, '');
            if (formattedDate.length > 2) {
                formattedDate = formattedDate.slice(0, 2) + '/' + formattedDate.slice(2);
            }
            setFormattedExpirationDate(formattedDate);
        }
    };

    const getAddressString = () => {
        if (user?.endereco) {
            const { rua, bairro, cidade, estado, cep } = user.endereco;
            return `${rua}, ${bairro}, ${cidade}, ${estado}, ${cep}`;
        }
        return '';
    };

    const getTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach((item) => {
            totalPrice += item.preco;
        });
        return totalPrice;
    };

    const handleConfirmPedido = async () => {
        const payload = {
            clienteId: user.id,
            restauranteId: cartItems[0]?.restaurante?.id,
            enderecoEntrega: user.endereco,
            itens: cartItems.map((item) => ({
                produtoId: item.id,
                quantidade: 1,
            })),
        };
        try {
            const response = await axiosInstance.post('/api/pedidos/new', payload);
            setPedido(response.data)
            clearCart();
            setToastMessage(
                "Te informaremos quando o restaurante aceitar seu pedido"
            );
            setToastType('success');
            setToastTitle('Compra feita com sucesso!');
            setToastVisible(true);
            history.push('/status-pedido')
        } catch (error) {
            setToastMessage(
                "Houve um erro ao fechar seu pedido, revise seus dados ou tente novamente mais tarde"
            );
            setToastType('error');
            setToastTitle('Erro ao fechar pedido');
            setToastVisible(true);
        }
    };

    return (
        <div className="bg-app min-h-screen pt-16">
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Checkout</h2>

                <div className="bg-card p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-2">Endereço de Entrega</h3>
                    {user?.endereco && <p>{getAddressString()}</p>}
                    <a
                        href="/editar-perfil"
                        className="text-primary font-bold hover:underline"
                    >
                        Editar Perfil
                    </a>
                </div>

                <div className="bg-card p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Resumo do Pedido</h3>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item.uuid}>{item.nome} - R$ {item.preco}</li>
                        ))}
                    </ul>

                    <p className="font-semibold mt-4">Preço Total: R$ {getTotalPrice()}</p>

                    <div className="mt-4">
                        <label htmlFor="paymentMethod" className="block mb-2 text-primary">Forma de Pagamento</label>
                        <select
                            id="paymentMethod"
                            className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                        >
                            <option value="card">Cartão de Crédito</option>
                            <option value="pix">PIX</option>
                            <option value="money">Dinheiro</option>
                        </select>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="mt-4">
                            <label htmlFor="cardNumber" className="block mb-2 text-primary">Número do Cartão</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={cardInfo.cardNumber}
                                maxLength={16}
                                onChange={handleCardInfoChange}
                            />
                            <div className="flex justify-center mt-4">
                                <div>
                                    <label htmlFor="expirationDate" className="block mb-2 text-primary">Data de Expiração</label>
                                    <input
                                        type="text"
                                        maxLength={5}
                                        id="expirationDate"
                                        name="expirationDate"
                                        className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={formattedExpirationDate}
                                        onChange={handleCardInfoChange}
                                    />
                                </div>
                                <div className="ml-4">
                                    <label htmlFor="cvv" className="block mb-2 text-primary">CVV</label>
                                    <input
                                        type="text"
                                        id="cvv"
                                        maxLength={3}
                                        name="cvv"
                                        className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                        value={cardInfo.cvv}
                                        onChange={handleCardInfoChange}
                                    />
                                </div>
                            </div>
                        </div>

                    )}

                    <button
                        className="bg-primary text-white py-2 px-4 rounded mt-4 hover:bg-secondary transition-colors duration-300"
                        onClick={handleConfirmPedido}
                    >
                        Confirmar Pedido
                    </button>
                </div>
            </div>
            <Toast
                isVisible={toastVisible}
                type={toastType}
                title={toastTitle}
                message={toastMessage}
                duration={3000}
                onDismiss={() => setToastVisible(false)}
            />
        </div>
    );
};

export default Checkout;
