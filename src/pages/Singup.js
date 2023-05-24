import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import Toast from '../components/Toast';
import { useLoading } from '../context/LoadingContexts';
import foodVenueLogo from '../images/foodVenueLogo.jpg';
import registerImage from '../images/loginImage.jpg';
import useAxiosInstance from '../utils/axiosInstance';
import "./Register.css";

const Register = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [telefone, setTelefone] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const { isLoading } = useLoading();
    const history = useHistory();
    const axiosInstance = useAxiosInstance()


    const redirectToLogin = () => {
        history.push('/');
    }
    const checkFieldsIsEmpty = () => {
        return nome === "" || email === "" || senha === "" || telefone === ""
            || rua === "" || bairro === "" || cidade === "" || estado === ""
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (checkFieldsIsEmpty()) {
            setToastVisible(true);
            return;
        }
        axiosInstance.post('/api/usuarios', {
            nome,
            email,
            senha,
            telefone,
            endereco: {
                rua,
                bairro,
                cidade,
                estado
            },
            tipo: "cliente"
        })
            .then(() => {

                localStorage.setItem("registerMessage", "true")
                history.push('/')
            })
            .catch(() => {
                setToastVisible(true);
            })
    };

    return (
        <div id='main' className="relative h-screen flex" style={{ backgroundImage: `url(${registerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div id="itemContainer" className="w-full flex justify-center">
                <div id='registerForm' className="p-24 shadow-lg min-h-full flex flex-col justify-center max-w-3xl my-auto bg-white bg-opacity-95">
                    <p id="title" className="text-primary mb-1 text-2xl font-bold">Encontre os melhores pratos com o Food Venue!</p>
                    <p id="subtitle" className="text-primary mb-3 text-xl">Crie sua conta agora</p>
                    <div className="flex flex-col items-center mb-8">
                        <img onClick={redirectToLogin} id="logo" src={foodVenueLogo} alt="Food Venue Logo" className="w-6/12 cursor-pointer rounded-full" />
                    </div>
                    <Toast
                        isVisible={toastVisible}
                        type="error"
                        title="Erro ao registrar"
                        message="Revise seus dados e tente novamente"
                        duration={3000}
                        onDismiss={() => setToastVisible(false)}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="mb-1">
                                <Input
                                    type="text"
                                    id="nome"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                    label="Nome completo"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <Input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <Input
                                    type="password"
                                    id="senha"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    label="Senha"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <Input
                                    type="text"
                                    id="telefone"
                                    value={telefone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                    label="Telefone"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <Input
                                    type="text"
                                    id="rua"
                                    value={rua}
                                    onChange={(e) => setRua(e.target.value)}
                                    label="Rua"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <Input
                                    type="text"
                                    id="bairro"
                                    value={bairro}
                                    onChange={(e) => setBairro(e.target.value)}
                                    label="Bairro"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    id="cidade"
                                    value={cidade}
                                    onChange={(e) => setCidade(e.target.value)}
                                    label="Cidade"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <Input
                                    type="text"
                                    id="estado"
                                    value={estado}
                                    onChange={(e) => setEstado(e.target.value)}
                                    label="Estado"
                                    required
                                />
                            </div>
                        </div>

                        <CustomButton
                            color="primary"
                            loading={isLoading}
                            onClick={handleSubmit}
                            disabled={false}
                        >
                            Registrar
                        </CustomButton>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;