import { Warning as WarningIcon } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PratoCard from '../components/PratoCard';
import DefaultImage from '../images/foodVenueLogo.jpg';
import { base64ToImageUrl } from '../utils/Base64ToImageUrl';
import useAxiosInstance from '../utils/axiosInstance';

const RestauranteDetail = () => {
    const [restaurante, setRestaurante] = useState({});
    const [pratos, setPratos] = useState([]);
    const { id } = useParams();
    const axiosInstance = useAxiosInstance();
    const imageUrl = restaurante.imagem ? base64ToImageUrl(restaurante.imagem) : DefaultImage;

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
            <div className="pt-16 flex items-center justify-center h-56 w-full">
                <img className="w-36 mr-2" src={imageUrl} alt="Icone do Restaurante" />
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
        </div>
    );
};

export default RestauranteDetail;
