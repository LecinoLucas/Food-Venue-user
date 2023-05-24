import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import Input from '../components/Input';
import Toast from '../components/Toast';
import { useLoading } from '../context/LoadingContexts';
import foodVenueLogo from '../images/foodVenueLogo.jpg';
import loginImage from '../images/loginImage.jpg';
import useAxiosInstance from '../utils/axiosInstance';
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastRegister, setToastRegister] = useState(false);
    const { isLoading } = useLoading();
    const history = useHistory();
    const axiosInstance = useAxiosInstance()

    const redirectToRegister = () => {
        history.push('/cadastro')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === null || password === null) {
            setEmailError(true);
            setPasswordError(true);
            setToastVisible(true);
        }
        axiosInstance.post('/api/auth/signin', { email, senha: password })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                axiosInstance.get('/api/restaurantes/get').then((resp) => {
                }).catch(() => {
                    setEmailError(true);
                    setPasswordError(true);
                    setToastVisible(true);
                })
                history.push('/pedidos');
            })
            .catch(() => {
                setEmailError(true);
                setPasswordError(true);
                setToastVisible(true);
            })
    };
    useEffect(() => {
        const message = localStorage.getItem('registerMessage');
        if (message) {
            setToastRegister(true)
            localStorage.removeItem('registerMessage');
        }
    }, []);
    return (
        <div id='main' className="relative h-screen flex" style={{ backgroundImage: `url(${loginImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Toast
                isVisible={toastRegister}
                type="success"
                title="Restaurante criado com sucesso!"
                message="Faça login usando seus dados cadastrados"
                duration={3000}
                onDismiss={() => setToastRegister(false)}
            />

            <div id="itemContainer" className="w-full flex justify-end mr-0">
                <div id='leftItems' className="w-full h-1/2  flex justify-center items-center">
                    <div className="p-5 mt-4 w-3/4">
                        <div className="text-start text-3xl">
                            <p className="text-white font-bold">Saboreie as melhores refeições com o Food Venue!</p>
                            <p className="text-white text-2xl">Crie sua conta e faça seu pedido agora <br /> Desfrute de um delivery rápido com  facilidade</p>
                            <div className='w-full mt-4 flex'>
                                <button
                                    id='buttonRegister'
                                    type="submit"
                                    onClick={redirectToRegister}
                                    className="bg-highlight w-1/2 text-white p-3 text-2xl rounded hover:bg-primary focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Cadastre-se aqui!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='loginForm' className="p-24 shadow-lg min-h-full flex flex-col justify-center max-w-md my-auto bg-white bg-opacity-90">
                    <div className="flex flex-col items-center mb-8">
                        <img src={foodVenueLogo} alt="Food Venue Logo" className="w-54 rounded-full" />
                    </div>
                    <Toast
                        isVisible={toastVisible}
                        type="error"
                        title="Email ou senha invalidos"
                        message="Revise seus dados e tente novamente"
                        duration={3000}
                        onDismiss={() => setToastVisible(false)}
                    />
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                required
                                error={emailError}
                            />
                        </div>
                        <div className="mb-4">
                            <Input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                required
                                error={passwordError}
                            />
                        </div>
                        <CustomButton
                            color="primary"
                            loading={isLoading}
                            onClick={handleSubmit}
                            disabled={false}
                        >
                            Login
                        </CustomButton>
                        <p className='mt-2 text-secondary block mb-1 font-semibold'> <button className='hover:text-blue-700 focus:outline-none'> Esqueceu sua senha?</button></p>
                        <div id="registerMobile" className='mt-6 hidden'>
                            <p className="text-secondary font-bold">Ainda não nos conhece? <br />Expanda seu negócio com Food Venue!</p>
                            <button
                                type="submit"
                                onClick={redirectToRegister}
                                className="bg-primary mt-5 text-white px-5 py-2 rounded w-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Cadastre-se
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default Login;
