import axios from "axios";
import Environment from "../../shared/Environment";
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
            apiClient.get(`${Environment.getDomainAdminInventory()}/api/tipo`)
            .then(_res => res(_res.data.data))
            .catch(() => {res([])})
        })
    }

    static obtenerSubTipos(id: string): Promise<ITipo[]> {
        return new Promise((res) => {
            axios.get(`${Environment.getDomainAdminInventory()}/api/subtipo/${id}`)
            .then(_res => res(_res.data.data))
            .catch(() => {res([])})
        })
    }

}