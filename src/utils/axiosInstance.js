import axios from 'axios';
import { useLoading } from '../context/LoadingContexts';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

const useAxiosInstance = () => {
    const { setIsLoading, setComponentName } = useLoading();

    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }
            if (config.componentName) {
                setComponentName(config.componentName);
            }
            setIsLoading(true);
            return config;
        },
        (error) => {
            setIsLoading(false);
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            setIsLoading(false);
            return response;
        },
        (error) => {
            setIsLoading(false);
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                if (window.location.pathname !== "/" && window.location.pathname !== "/cadastro") {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }
            }

            return Promise.reject(error);
        }
    );


    return axiosInstance;
};

export default useAxiosInstance;
