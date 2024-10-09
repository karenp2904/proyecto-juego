import { HeroeData } from "../app/pages/admin/inventarioDetalle/CrearHeorePage";
import Environment from "../../shared/Environment";
import apiClient from "./config/AxiosConfig";

export class HeroeService {

    static guardarHeroe(heroe: HeroeData, image: File): Promise<void> {
        const formData = new FormData();
        formData.append('tipo', heroe.tipo);
        formData.append('subtipo', heroe.subtipo);
        formData.append('stock', heroe.stock.toString());

        formData.append('estadisticas', JSON.stringify(heroe.estadisticas));
        formData.append('probabilidadDeAtaque', JSON.stringify(heroe.probabilidadDeAtaque));

        formData.append("image", image);

        return new Promise((res) => {
            apiClient.post(`${Environment.getDomainAdminInventory()}/api/heroe`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => res())
            .catch(() => res())
        })
    }
}