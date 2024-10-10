import { ResponseGeneric, ResponsePginated } from "../interfaces/ResponseGeneric"; // Asegúrate de importar ResponseGeneric
import apiClient from "./config/AxiosConfig";

export interface FiltrosInventario {
  tipo?: string; // Opcional
  subtipo?: string; // Opcional
  producto?: string; // Opcional
  id?: string; // Opcional
  page?: number; // Opcional
  limit?: number; // Opcional
}

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


// Función para obtener productos con filtros y paginación
export const getProductosInventario = async (filters: FiltrosInventario) => {
  try {
    // Construir los parámetros de la consulta basados en los filtros proporcionados
    const params: FiltrosInventario = {
      tipo: filters.tipo,
      subtipo: filters.subtipo,
      producto: filters.producto,
      id: filters.id,
      page: filters.page || 1,  // Página por defecto
      limit: filters.limit || 12  // Límite por defecto
    };

    // Realizar la solicitud GET con los parámetros de consulta
    const response = await apiClient.get<ResponsePginated<any>>('/inventario', {
      params
    });

    // Verificar la respuesta
    if (response.data.isSuccess) {
      console.log('Productos obtenidos con éxito:', response.data.data);
      return response.data;
    } else {
      console.error('Error en la respuesta del servidor:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error al obtener los productos del inventario:', error);
    throw error;
  }
};


export const getImageById = async (id: string): Promise<string> => {
  const url = `/inventario/image/${id}`; // URL relativa a la base URL definida en apiClient
  
  try {
    const response = await apiClient.get(url, {
      responseType: 'blob', // Especifica que esperas un blob de la respuesta
    });
    
    const blob = response.data; // La respuesta es un Blob
    return URL.createObjectURL(blob); // Crea un objeto URL para la imagen
  } catch (error) {
    console.error('Error al obtener la imagen:', error);
    throw error; // Propaga el error para manejarlo en el componente
  }
};

export const deleteProductoById = async (id: string) => {
  try {
    const response = await apiClient.put<ResponseGeneric<boolean>>(`/inventario/${id}`);
    
    if (response.data.isSuccess) {
      console.log('Producto borrado con éxito:', response.data.data);
      return response.data;
    } else {
      console.error('Error al borrar el producto:', response.data.message);
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error('Error al borrar el producto:', error);
    throw error;
  }
};