import axios from 'axios';

const api = axios.create({
  // Esta es la URL que me diste hace un momento
  baseURL: 'http://172.16.1.3:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
