export enum TipoHeroeEnum {
    Guerrero = "Guerrero",
    Mago = "Mago",
    Picaro = "Picaro",
}

export enum SubTipoHeroeEnum {
    Tanque = "Tanque",
    Armas = "Armas",
    Fuego = "Fuego",
    Hielo = "Hielo",
    Veneno = "Veneno",
    Machete = "Machete"
}

export interface HeroeCreate {
    tipo: string; 
    subtipo: string; 
    stock: number;
    estadisticas: {
      poder: number;
      vida: number;
      defensa: number;
      ataque: {
        modificador: number;
        lanzamientos: number;
        caras: number;
      };
      daño: {
        modificador: number;
        lanzamientos: number;
        caras: number;
      };
      acciones: string[];
    };
    probabilidadDeAtaque: Record<string, number>; // Clave puede ser algo como "cuerpoACuerpo", "distancia", etc.
  }
  