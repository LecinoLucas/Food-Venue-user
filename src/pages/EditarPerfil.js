import React, { useContext, useEffect, useState } from 'react';
import Toast from '../components/Toast';
import { UserContext } from '../context/UserContext';
import useAxiosInstance from '../utils/axiosInstance';

const EditarPerfil = () => {
    const [telefone, setTelefone] = useState('');
    const { user, updateUser } = useContext(UserContext)
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('error');
    const [toastTitle, setToastTitle] = useState('');
    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
    });

    const axiosInstance = useAxiosInstance();

    useEffect(() => {
        setTelefone(user?.telefone);
        setEndereco(user?.endereco);

    }, [user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const updatedUsuario = {
            telefone: telefone,
            endereco: endereco
        };

        axiosInstance
            .put(`/api/usuarios/${user.id}`, updatedUsuario)
            .then((response) => {
                setToastMessage(
                    "Dados atualizados com sucesso!"
                );
                setToastType('success');
                setToastTitle('Atualizado com sucesso');
                setToastVisible(true);
                updateUser({ ...user, telefone, endereco })
            })
            .catch(() => {
                setToastMessage(
                    "Houve um erro no servidor, aguarde algum tempo e tente novamente"
                );
                setToastType('error');
                setToastTitle('Erro interno');
                setToastVisible(true);
            });
    };
    console.log(user)
    return (
        <div className="bg-app min-h-screen pt-16">
            <div className="max-w-xl mx-auto p-4">
                <h2 className="text-3xl font-semibold mb-4 text-primary">Editar Perfil</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="flex flex-wrap mb-4">
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                            <label htmlFor="telefone" className="block mb-2 text-primary">
                                Telefone
                            </label>
                            <input
                                type="text"
                                id="telefone"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={telefone}
                                onChange={(e) => setTelefone(e.target.value)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pl-2">
                            <label htmlFor="rua" className="block mb-2 text-primary">
                                Rua
                            </label>
                            <input
                                type="text"
                                id="rua"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={endereco?.rua}
                                onChange={(e) =>
                                    setEndereco({ ...endereco, rua: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                            <label htmlFor="bairro" className="block mb-2 text-primary">
                                Bairro
                            </label>
                            <input
                                type="text"
                                id="bairro"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={endereco?.bairro}
                                onChange={(e) =>
                                    setEndereco({ ...endereco, bairro: e.target.value })
                                }
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pl-2">
                            <label htmlFor="cidade" className="block mb-2 text-primary">
                                Cidade
                            </label>
                            <input
                                type="text"
                                id="cidade"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={endereco?.cidade}
                                onChange={(e) =>
                                    setEndereco({ ...endereco, cidade: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap mb-4">
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-2">
                            <label htmlFor="estado" className="block mb-2 text-primary">
                                Estado
                            </label>
                            <input
                                type="text"
                                id="estado"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={endereco?.estado}
                                onChange={(e) =>
                                    setEndereco({ ...endereco, estado: e.target.value })
                                }
                            />
                        </div>
                        <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pl-2">
                            <label htmlFor="cep" className="block mb-2 text-primary">
                                CEP
                            </label>
                            <input
                                type="text"
                                id="cep"
                                className="border rounded py-2 px-3 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                                value={endereco?.cep}
                                onChange={(e) =>
                                    setEndereco({ ...endereco, cep: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-44 bg-primary text-white py-2 px-4 rounded hover:bg-secondary transition-colors duration-300"
                        >
                            Salvar
                        </button>
                    </div>
                </form>
                <Toast
                    isVisible={toastVisible}
                    type={toastType}
                    title={toastTitle}
                    message={toastMessage}
                    duration={3000}
                    onDismiss={() => setToastVisible(false)}
                />
            </div>
        </div>
    );
};

export default EditarPerfil;
