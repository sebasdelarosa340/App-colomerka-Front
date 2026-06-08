// src/services/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
    // Aquí podrás inyectar el token JWT de las cookies en el futuro para rutas protegidas
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ocurrió un error inesperado en el servidor.');
    }

    return data;
  } catch (error: any) {
    console.error(`[API Error Fetching ${endpoint}]:`, error.message);
    throw error;
  }
};
