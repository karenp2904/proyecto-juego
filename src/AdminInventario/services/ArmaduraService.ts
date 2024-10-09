import { ArmaduraData } from "../app/pages/admin/crearArmadura/CrearArmaduraPage";
import Environment from "../../shared/Environment";
import apiClient from "./config/AxiosConfig";

export class ArmaduraService {
  static guardarArma(armadura: ArmaduraData, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('tipo', armadura.tipo);
    formData.append('subtipo', armadura.subtipo);
    // formData.append('stock', arma.stock.toString());
    formData.append('descripcion', armadura.descripcion);

    // Agregar estadisticas
    formData.append('estadisticas', JSON.stringify(armadura.estadisticas));

    // Agregar armas (nombre, efectos, porcentajeCaida)
    formData.append('armadura', JSON.stringify(armadura.armadura));

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
