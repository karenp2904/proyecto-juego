import axios from "axios";
import { ArmaduraData } from "../app/pages/admin/crearArmadura/CrearArmaduraPage";
import apiClient from "./config/AxiosConfig";

export class ArmaduraService {
  static guardarArma(armadura: ArmaduraData, image: File): Promise<void> {
    const formData = new FormData();
    // Agregar el objeto arma como JSON
    formData.append('arma', JSON.stringify({
      nombre: armadura.armadura.nombre,
      equipablePor: [armadura.subtipo],
      stock: armadura.stock,
      descripcion: armadura.descripcion,
      tasaCaida: armadura.armadura.porcentajeCaida,
    }));

    // Adjuntar la imagen
    formData.append("image", image);

    return new Promise((res, rej) => {
      apiClient.post("/arma", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => res())
      .catch(err => rej(err));
    });
  }
}
