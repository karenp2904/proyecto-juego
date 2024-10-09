// Combatiente.ts

export interface Equipment {
  id: string;
  name: string;
  type: 'Armadura' | 'Arma' | 'Item';
  slot: string;
  image: string;
  effects: {
    attack?: number;
    defense?: number;
    health?: number;
    criticalChance?: number;
    opponentAttack?: number;
    opponentCriticalChance?: number;
    damageOverTime?: number;
    duration?: number;
    specialEffect?: string;
  };
  dropChance: number;
  compatibleHeroes: string[];
  Heroe: 'Guerrero' | 'Mago' | 'Picaro';
}

export default interface Combatiente {
  _id: string;
  name: string;
  type: string;
  level: number;
  powerPoints: number;
  powerPointsLeft: number;
  health: number;
  maxHealth: number;
  defense: number;
  attack: number;
  damage: number;
  experience: number;
  inventory: string[];
  equippedItems: {
    armor1: Equipment | null;
    armor2: Equipment | null;
    weapon: Equipment | null;
    item: Equipment | null; // Nuevo slot para ítems
  };
  bagItems: Equipment[]; // Add this line
 

  baseAttack: number;
  baseDefense: number;
  baseHealth: number;
  baseMaxHealth: number;
  abilities: string[];
  image: string;
}

