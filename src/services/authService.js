import api from './api';

export const loginUsuario = async (credenciales) => {
  const response = await api.post('/login', credenciales);
  return response.data;
};
