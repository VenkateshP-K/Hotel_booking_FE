import axios from 'axios';

// Define baseurl for api
const baseURL = 'https://hotel-booking-be-6h4d.onrender.com/api';

// Create an axios instance
const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

const protectedInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export { instance, protectedInstance };