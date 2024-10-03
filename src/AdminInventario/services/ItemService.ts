import { ItemData } from "../app/pages/admin/crearItem/CrearItemPage";
import Environment from "../../shared/Environment";
import apiClient from "./config/AxiosConfig";


export class ItemService {
  static guardarItem(item: ItemData, image: File): Promise<void> {
    const formData = new FormData();
    formData.append('tipo', item.tipo);
    formData.append('subtipo', item.subtipo);
    // formData.append('stock', arma.stock.toString());
    formData.append('descripcion', item.descripcion);

    // Agregar estadisticas
    formData.append('estadisticas', JSON.stringify(item.estadisticas));

    // Agregar armas (nombre, efectos, porcentajeCaida)
    formData.append('item', JSON.stringify(item.armas));

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