import { Warning as WarningIcon } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Modal from '../components/Modal';
import PratoCard from '../components/PratoCard';
import { CartContext } from '../context/CardContext';
import DefaultImage from '../images/foodVenueLogo.jpg';
import { base64ToImageUrl } from '../utils/Base64ToImageUrl';
import useAxiosInstance from '../utils/axiosInstance';

const RestauranteDetail = () => {
    const [restaurante, setRestaurante] = useState({});
    const [pratos, setPratos] = useState([]);
    const { id } = useParams();
    const { cartItems, clearCart } = useContext(CartContext);
    const history = useHistory();
    const axiosInstance = useAxiosInstance();
    const imageUrl = restaurante.imagem ? base64ToImageUrl(restaurante.imagem) : DefaultImage;
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        axiosInstance.get(`/api/restaurantes/${id}`)
            .then((response) => {
                setRestaurante(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, axiosInstance]);

    useEffect(() => {


        if (cartItems.length > 0 && cartItems[0]?.restaurante?.id !== Number(id)) {
            setShowModal(true);
        }
    }, [cartItems, id]);

    const handleClearCart = () => {
        clearCart();
        setShowModal(false);
    };

    const handleContinueShopping = () => {
        setShowModal(false);
        history.push('/carrinho')
    };

    useEffect(() => {
        axiosInstance.get(`/api/pratos/restaurante/${id}`)
            .then((response) => {
                setPratos(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, axiosInstance]);

    return (
        <div className="bg-app min-h-screen">
            <div className="pt-24 flex flex-col md:flex-row items-center justify-center h-auto w-full">
                <img className="w-36 md:w-48 lg:w-64 mb-4 md:mb-0 md:mr-4" src={imageUrl} alt="Icone do Restaurante" />
                <div>
                    <h1 className="text-4xl font-semibold text-primary">{restaurante.nome}</h1>
                    <p className="mt-2 px-4 text-center">{restaurante.descricao}</p>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Pratos do Restaurante</h2>
                {pratos.length > 0 ? (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pratos.map((prato) => (
                            <PratoCard key={prato.uuid} prato={prato} />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center p-8">
                        <WarningIcon className="text-warning mr-4" style={{ fontSize: "70px" }} />
                        <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-primary">Desculpe, não há pratos disponíveis no momento.</p>
                    </div>
                )}
            </div>
            <Modal
                isOpen={showModal}
                title="Itens de outro restaurante no carrinho"
                onSave={handleClearCart}
                onCancel={handleContinueShopping}
                labelButtonSave="Limpar carrinho"
                labelButtonCancel="Pagar pedido atual"
            >
                <p>Você já tem itens de outro restaurante no carrinho. Você gostaria de limpar o carrinho para adicionar itens deste restaurante ou ir para seu carrinho fechar seu pedido atual?</p>
            </Modal>
        </div>
    );
};

export default RestauranteDetail;
