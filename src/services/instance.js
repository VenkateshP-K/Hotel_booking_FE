import axios from 'axios';

// Define baseurl for api
const baseURL = 'http://localhost:4300/api';

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
