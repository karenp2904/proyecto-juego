import Acciones from '../interfaces/Acciones';

type EffectValue = number | { amount: number; duration: number } | boolean | string;

export interface RawAccion {
  _id: string;
  name: string;
  heroType: string;
  minLevel: number;
  powerCost: number;
  effects: { [key: string]: unknown };
  cooldown?: number;
}

export function mapToAcciones(data: RawAccion): Acciones {
  return {
    _id: data._id,
    name: data.name,
    heroType: data.heroType,
    minLevel: data.minLevel,
    powerCost: data.powerCost,
    effects: mapEffects(data.effects),
    cooldown: data.cooldown
  };
}

function mapEffects(effects: { [key: string]: unknown }): { [key: string]: EffectValue } {
  const mappedEffects: { [key: string]: EffectValue } = {};
  
  for (const [key, value] of Object.entries(effects)) {
    if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
      mappedEffects[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      if ('amount' in value && 'duration' in value && 
          typeof value.amount === 'number' && typeof value.duration === 'number') {
        mappedEffects[key] = { amount: value.amount, duration: value.duration };
      } else {
        console.warn(`Unexpected effect structure for key: ${key}`);
      }
    } else {
      console.warn(`Unexpected value type for effect: ${key}`);
    }
  }
  
  return mappedEffects;
}