import { EpicaData } from "../app/pages/admin/crearEpica/CrearEpicaPage";
import Environment from "../../shared/Environment";
import apiClient from "./config/AxiosConfig";


export class EpicaService {
  static guardarEpica(epica: EpicaData, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('tipo', epica.tipo);
    formData.append('subtipo', epica.subtipo);
    // formData.append('stock', arma.stock.toString());
    formData.append('descripcion', epica.descripcion);

    // Agregar estadisticas
    formData.append('estadisticas', JSON.stringify(epica.estadisticas));

    // Agregar armas (nombre, efectos, porcentajeCaida)
    formData.append('armas', JSON.stringify(epica.armas));

    // Adjuntar la imagen
    formData.append("image", image);

    return new Promise((res, rej) => {
      apiClient.post(`${Environment.getDomainAdminInventory()}/api/arma`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => res())
      .catch(err => rej(err));
    });
  }
}