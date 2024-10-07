interface EffectValue {
  amount?: number | string;
  duration?: number;
}

export interface Acciones {
  _id: string;
  name: string;
  heroType: string;
  minLevel: number;
  powerCost: number;
  effects: {
    [key: string]: number | boolean | string | EffectValue;
  };
  cooldown?: number;
}
