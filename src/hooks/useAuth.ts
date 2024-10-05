import User from "../types/User";
import { create } from "zustand";
import React from "react";
import Environment from "../shared/Environment";

// Definir el tipo IUseAuth
export type IUseAuth = {
    user: User | null;
    auth: () => void;
    updateUserData: () => void;
};

// Crear el store zustand
export const useAuth = create<IUseAuth>((set) => {
    const usuario = localStorage.getItem("usuario");

    // Retorna el estado inicial y las funciones de actualización
    return {
        user: usuario ? JSON.parse(usuario) : null,

        // Función de autenticación
        auth: async () => {
            const usuario = localStorage.getItem("usuario");
            if (usuario) {
                set({
                    user: JSON.parse(usuario)
                });
            }
        },

        // Función para actualizar los datos del usuario periódicamente
        updateUserData: async() => {
            const usuario = localStorage.getItem("usuario");
            if (usuario) {
                const updatedUser = JSON.parse(usuario);

                
                updatedUser.credits = await getCredits(updatedUser.iduser); 

                // Guardar el usuario actualizado en el localStorage
                localStorage.setItem("usuario", JSON.stringify(updatedUser));

               
                set({
                    user: updatedUser
                });
            }
        }
    };
});

// Hook para iniciar la actualización periódica
export const useUpdateUserCredits = () => {
    const { updateUserData } = useAuth();

   
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            updateUserData(); // Actualizar los datos del usuario
        }, 20000); 

        
        return () => clearInterval(intervalId);
    }, [updateUserData]);
};

async function getCredits(iduser:number){

    console.log(iduser + "creditosUser")
    console.log(JSON.stringify({iduser: iduser}))

    const response = await fetch(`${Environment.getDomain()}/api/getCredits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({iduser: iduser}),
    });

    if (response.ok) {
    
      const data= await response.json()
      console.log(data.usuario + 'creditosUser')
      return data.usuario

    }else{
      return null
    }
}
