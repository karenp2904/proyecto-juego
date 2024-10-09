import { ArmaData } from "../app/pages/admin/crearArma/CrearArmaPage";
import apiClient from "./config/AxiosConfig";
import Environment from "../../shared/Environment";


export class ArmaService {
  static guardarArma(arma: ArmaData, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('tipo', arma.tipo);
    formData.append('subtipo', arma.subtipo);
    // formData.append('stock', arma.stock.toString());
    formData.append('descripcion', arma.descripcion);

    // Agregar estadisticas
    formData.append('estadisticas', JSON.stringify(arma.estadisticas));

    // Agregar armas (nombre, efectos, porcentajeCaida)
    formData.append('armas', JSON.stringify(arma.armas));

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
