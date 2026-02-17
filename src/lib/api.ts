import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // Crucial for HttpOnly cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Since we are using HttpOnly Cookies, the browser automatically 
// sends the token. We no longer need the interceptor to manually 
// attach it from localStorage/sessionStorage.
export default api;
