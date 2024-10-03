import { HeroeCreate } from "../interfaces/Heroe";
import { ResponseGeneric } from "../interfaces/ResponseGeneric"; // Asegúrate de importar ResponseGeneric
import apiClient from "./config/AxiosConfig";

// Función para crear un héroe
export const crearHeroe = async (heroeDto: HeroeCreate, file?: File): Promise<ResponseGeneric<string>> => {
  try {
    // Crear un FormData para manejar tanto datos JSON como archivos
    const formData = new FormData();

    // Añadir los datos del héroe al FormData
    formData.append('heroe', JSON.stringify(heroeDto));

    // Si hay un archivo, añadirlo al FormData
    if (file) {
      formData.append('image', file);
    }

    // Enviar la solicitud POST
    const response = await apiClient.post('/heroes', formData, {
      headers: {
        'Content-Type': 'multipart/form-data' // Necesario para enviar archivos
      }
    });

    // Manejar la respuesta
    if (response.status === 200) {
      return { isSuccess: true, data: response.data };
    } else {
      return { isSuccess: false, message: response.data.message || 'Error desconocido' };
    }
  } catch (error) {
    return { isSuccess: false, message: `${error}` || 'Error en la solicitud' };
  }
};

export const getProductoById = async (id: string) => {
  try {
    const response = await apiClient.get(`/inventario/${id}`);
    console.log('Producto:', response.data);
    return response.data.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
}