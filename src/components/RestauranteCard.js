// components/RestauranteCard.js
import React from 'react';
import DefaultImage from '../images/foodVenueLogo.jpg'; // Substitua pelo caminho para sua imagem padrão
import { base64ToImageUrl } from '../utils/Base64ToImageUrl'; // Importe a função aqui

const RestauranteCard = ({ restaurante }) => {
    const imageUrl = restaurante.imagem ? base64ToImageUrl(restaurante.imagem) : DefaultImage;

    return (
        <div className="w-48 h-auto md:w-60 lg:w-64 xl:w-72 rounded overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:scale-105">
            <div className="w-full h-32 md:h-40 lg:h-48 xl:h-52 overflow-hidden">
                <img className="object-cover h-full w-full"
                    src={imageUrl}
                    alt={restaurante.nome}
                />
            </div>
            <div className="px-4 py-2">
                <div className="font-bold text-lg mb-2">{restaurante.nome}</div>
                <p className="text-gray-700 text-base">{restaurante.descricao}</p>
            </div>
        </div>
    );
};

export default RestauranteCard;
