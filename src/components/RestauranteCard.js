//RestauranteCard.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import DefaultImage from '../images/foodVenueLogo.jpg';
import { base64ToImageUrl } from '../utils/Base64ToImageUrl';

const RestauranteCard = ({ restaurante }) => {
    const imageUrl = restaurante.imagem ? base64ToImageUrl(restaurante.imagem) : DefaultImage;
    const history = useHistory();

    const redirectToRestaurantPage = () => {
        history.push(`/restaurante/${restaurante.id}`)
    }

    return (
        <div onClick={() => redirectToRestaurantPage()} className="w-full h-auto rounded-lg overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105 bg-card">
            <div className="w-full h-40 overflow-hidden relative">
                <img
                    className="object-cover h-full w-full"
                    src={imageUrl}
                    alt={restaurante.nome}
                />
            </div>
            <div className="px-4 py-3">
                <div className="font-bold text-lg text-primary mb-2">{restaurante.nome}</div>
                <p className="text-gray-700 text-sm">{restaurante.descricao}</p>
            </div>
        </div>
    );
};

export default RestauranteCard;
