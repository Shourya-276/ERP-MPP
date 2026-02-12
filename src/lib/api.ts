import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Automatically add token to headers for every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('erp_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
