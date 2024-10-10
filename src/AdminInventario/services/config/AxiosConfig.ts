import axios from 'axios';

// Función para obtener el token, por ejemplo desde localStorage o contexto
const getToken = () => {
  return localStorage.getItem('authToken'); // Ajusta esto según dónde almacenes el token
};

const apiClient = axios.create({
  baseURL: 'http://192.168.1.4:5000/api', // Cambia esto a la URL base de tu servidor //CAMBIO DE PUERTO
});

// Interceptor para agregar el token a los headers de cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;