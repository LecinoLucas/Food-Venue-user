import React, { useContext } from 'react';
import { CartContext } from '../context/CardContext';
import { base64ToImageUrl } from '../utils/Base64ToImageUrl';

const PratoCard = ({ prato }) => {
    const { addToCart } = useContext(CartContext);
    const imageUrl = base64ToImageUrl(prato.imagemBytes);

    return (
        <div className="w-full p-12  h-auto rounded-lg overflow-hidden shadow-md bg-app transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer flex flex-col">
            <div className="w-full h-40 overflow-hidden relative">
                <img
                    className="object-cover h-full w-full"
                    src={imageUrl}
                    alt={prato.nome}
                />
            </div>
            <div className="px-4 py-3 flex-1">
                <div className="font-bold text-xl text-primary mb-1">{prato.nome}</div>
                <p className="text-gray-700 mb-2 flex-1">{prato.descricao}</p>
            </div>
            <div className="px-4 pb-4 mt-4 flex justify-between items-center">
                <span className="text-highlight font-bold text-lg">R$ {prato.preco}</span>
                <button
                    className="bg-primary text-white py-1 px-4 rounded hover:bg-secondary transition-colors"
                    onClick={() => addToCart(prato)}
                >
                    Adicionar ao carrinho
                </button>
            </div>
        </div>
    );
};

export default PratoCard;
