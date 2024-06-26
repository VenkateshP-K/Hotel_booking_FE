import axios from 'axios';

const baseURL = 'https://hotel-booking-be-6h4d.onrender.com/api';

const instance = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true
});

const protectedInstance = axios.create({
    baseURL,
    timeout: 5000,
    withCredentials: true
});

protectedInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { instance, protectedInstance };