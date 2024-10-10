import axios from "axios";
import apiClient from "./config/AxiosConfig";
import { HeroeData } from "../app/pages/admin/crearHeroe/CrearHeorePage";

export class HeroeService {
    static guardarHeroe(heroe: HeroeData, image: File): Promise<void> {
        const formData = new FormData();
        
        // Agregar los datos del héroe al FormData
        formData.append('heroe', JSON.stringify(heroe));  // Añadir el objeto heroe como JSON string
        formData.append('tipo', heroe.tipo);
        formData.append('subtipo', heroe.subtipo);
        formData.append('stock', heroe.stock.toString());
        formData.append('estadisticas', JSON.stringify(heroe.estadisticas));
        formData.append('probabilidadDeAtaque', JSON.stringify(heroe.probabilidadDeAtaque));
        
        // Agregar la imagen
        formData.append("image", image);
        
        // Log para verificar que 'heroe' se envía correctamente
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
        return apiClient.post("/heroe", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        })
        
        .then((response) => {
            console.log('Héroe guardado exitosamente:', response.data);
        })
        .catch((error) => {
            console.error('Error al guardar el héroe:', error);
            throw error;  // Lanzar el error para manejarlo en la llamada
        });
    }
}
