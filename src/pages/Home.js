import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
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
    }, []);

    const filteredRestaurantes = restaurantes.filter((restaurante) =>
        restaurante.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-app min-h-screen">
            <Header />
            <main className="p-4 mx-auto">
                <h1 className="text-3xl font-semibold mb-4 text-center">Nossos Restaurantes</h1>
                <input
                    type="text"
                    className="border rounded p-2 mb-4 w-full mx-auto md:max-w-md"
                    placeholder="Pesquise por restaurantes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="grid justify-items-center items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredRestaurantes.map((restaurante) => (
                        <RestauranteCard key={restaurante.id} restaurante={restaurante} />
                    ))}
                </div>
            </main>
        </div>
    );

};

export default Home;
