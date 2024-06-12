import axios from 'axios';

//define baseurl for api
const baseURL = 'https://hotel-booking-be-hxbx.onrender.com/api';

//create an axios instance
const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

const protectedInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export { instance, protectedInstance }