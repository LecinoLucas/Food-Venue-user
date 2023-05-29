import { Delete as DeleteIcon, MonetizationOn as MonetizationOnIcon, Warning as WarningIcon } from '@mui/icons-material';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import { CartContext } from '../context/CardContext';
import { base64ToImageUrl } from '../utils/Base64ToImageUrl';

const Carrinho = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const history = useHistory();
    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
    };

    const redirectToCheckout = () => {
        history.push('/checkout')
    }

    const getTotalPrice = () => {
        const totalPrice = cartItems.reduce((total, item) => total + item.preco, 0);
        return totalPrice.toFixed(2);
    };

    return (
        <div className="bg-app min-h-screen pt-16">
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Carrinho</h2>
                <div className='mt-12 overflow-y-auto' style={{ maxHeight: 'calc(100vh - 260px)' }}>
                    {cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <div key={item.uuid} className="border border-gray-300 rounded-md p-4 flex items-center mb-4">
                                <img className="w-20 h-20 object-cover mr-4" src={base64ToImageUrl(item.imagemBytes)} alt={item.nome} />
                                <div>
                                    <h3 className="text-lg font-semibold">{item.nome}</h3>
                                    <p className="text-sm text-gray-500">R$ {item.preco.toFixed(2)}</p>
                                    <p className="text-sm text-gray-500">{item.descricao}</p>
                                </div>
                                <button className="ml-auto" onClick={() => handleRemoveItem(item.uuid)}>
                                    <DeleteIcon className="text-gray-500" />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center p-8">
                            <WarningIcon className="text-warning mr-4" style={{ fontSize: "70px" }} />
                            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">O carrinho está vazio.</p>
                        </div>
                    )}
                </div>
                {cartItems.length > 0 && (
                    <div className="flex items-center justify-between mt-8">
                        <div className="flex items-center">
                            <MonetizationOnIcon className="text-primary mr-2" />
                            <span className="text-lg font-semibold">Total: R$ {getTotalPrice()}</span>
                        </div>
                        <div>
                            <CustomButton
                                color="primary"
                                onClick={redirectToCheckout}
                                disabled={false}
                            >
                                Fechar pedido
                            </CustomButton>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Carrinho;
