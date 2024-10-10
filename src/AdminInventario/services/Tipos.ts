import axios from "axios";
import apiClient from "./config/AxiosConfig";

export interface ITipo {
    _id: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}


export class TiposService {

    static obtenerTipos(): Promise<ITipo[]> {
        return new Promise((res) => {
            apiClient.get("/tipo")
            .then(_res => res(_res.data.data))
            .catch((error) => {
                console.log(error)
                res([])})
        })
    }

    static obtenerSubTipos(id: string): Promise<ITipo[]> {
        return new Promise((res) => {
            apiClient.get(`/subtipo/${id}`)
            .then(_res => res(_res.data.data))
            .catch(() => {res([])})
        })
    }

}