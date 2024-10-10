import { EpicaData } from "../app/pages/admin/crearEpica/CrearEpicaPage";
import apiClient from "./config/AxiosConfig";


export class EpicaService {
  static guardarEpica(epica: EpicaData, image: File): Promise<void> {
    const formData = new FormData();
    // Agregar el objeto arma como JSON
    formData.append('epica', JSON.stringify({
      nombre: epica.epica.nombre,
      equipablePor: [epica.subtipo],
      stock: epica.stock,
      descripcion: epica.descripcion,
      tasaAprender: epica.epica.porcentajeCaida,
    }));

    // Adjuntar la imagen
    formData.append("image", image);

    return apiClient.post("/epica", formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
        },
    })
    .then((response) => {
        console.log('Arma guardado exitosamente:', response.data);
    })
    .catch((error) => {
        console.error('Error al guardar el arma:', error);
        throw error;  // Lanzar el error para manejarlo en la llamada
    });
  }
}
