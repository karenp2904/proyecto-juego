import User from "../types/User"
import { create } from "zustand"

export type IUseAuth = {
    user: User | null
    auth: () => void
}

export const useAuth = create<IUseAuth>((set) => {
    const usuario = localStorage.getItem("usuario");

    return {
        user: usuario ? JSON.parse(usuario) : null,
        auth: async () => {
            const usuario = localStorage.getItem("usuario");
            if (usuario) {
                set({
                    user: JSON.parse(usuario)
                });
            }
        }
    };
});
