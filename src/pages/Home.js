//Home.js
import React, { useEffect, useState } from 'react';
import RestauranteCard from '../components/RestauranteCard';
import useAxiosInstance from '../utils/axiosInstance';

const Home = () => {
    const [restaurantes, setRestaurantes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const axiosInstance = useAxiosInstance()

    useEffect(() => {
        axiosInstance.get('/api/restaurantes')
            .then((response) => {
                setRestaurantes(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [axiosInstance]);

    const filteredRestaurantes = restaurantes.filter((restaurante) =>
        restaurante.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-app min-h-screen pt-16">
            <main className="p-8 mx-auto">
                <h1 className="text-4xl font-semibold mb-6 text-center text-primary">Nossos Restaurantes</h1>
                <input
                    type="text"
                    className="border rounded p-3 mb-8 w-full mx-auto md:max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Pesquise por restaurantes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid justify-items-center items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredRestaurantes.map((restaurante) => (
                        <RestauranteCard key={restaurante.id} restaurante={restaurante} />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
