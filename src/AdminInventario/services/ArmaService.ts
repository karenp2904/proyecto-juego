import { ArmaData } from "../app/pages/admin/crearArma/CrearArmaPage";
import apiClient from "./config/AxiosConfig";

export class ArmaService {
  static guardarArma(arma: ArmaData, image: File): Promise<void> {
    const formData = new FormData();

    // Agregar el objeto arma como JSON
    formData.append('arma', JSON.stringify({
      nombre: arma.armas.nombre,
      equipablePor: [arma.subtipo],
      stock: arma.stock,
      descripcion: arma.descripcion,
      tasaCaida: arma.armas.porcentajeCaida,
    }));

    // Adjuntar la imagen
    formData.append("image", image);

    // Log para verificar que los datos se envían correctamente
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    return apiClient.post("/arma", formData, {
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
