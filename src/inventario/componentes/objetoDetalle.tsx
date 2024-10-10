import { FaFistRaised, FaShieldAlt, FaHeart, FaMagic } from "react-icons/fa"; // Iconos de ejemplo
import { GiHealthPotion, GiReturnArrow, GiCrossedSwords } from "react-icons/gi"; // Más iconos de ejemplo

interface ObjDetalleProps {
  titulo: string;
  img: string;
  estadisticas: string;
  calificacion?: number;
  effects: Effects;
}

interface Effects {
  attackBoost?: { number: number; turn_effect: number };
  damageBoost?: { number: number; turn_effect: number };
  criticBoost?: { number: number; turn_effect: number };
  magic_damage?: { number: number; turn_effect: number };
  healthBoost?: { number: number; turn_effect: number };
  recover_health?: { number: number; turn_effect: number };
  defenseBoost?: { number: number; turn_effect: number };
  oponent_power?: { number: number; turn_effect: number };
  oponent_attack?: { number: number; turn_effect: number };
  oponent_damage?: { number: number; turn_effect: number };
  oponent_critical_damage?: { number: number; turn_effect: number };
  multiply_object_effect?: {
    object: string; // o el tipo correcto que uses para referenciar objetos
    effect: number;
  };
  return_damage?: { number: number; turn_effect: number };
  ignore_physic_atack?: { boolean: boolean; turn_effect: number };
}

const effectIconMap: { [key: string]: JSX.Element } = {
  attackBoost: <FaFistRaised />,
  damageBoost: <GiCrossedSwords />,
  criticBoost: <FaFistRaised />,
  magic_damage: <FaMagic />,
  healthBoost: <FaHeart />,
  recover_health: <GiHealthPotion />,
  defenseBoost: <FaShieldAlt />,
  return_damage: <GiReturnArrow />,
  // Otros iconos que puedas necesitar
};

function ObjDetalle(props: ObjDetalleProps) {
  const { titulo, img, estadisticas, calificacion, effects } = props;

  return (
    <div className="ObjDetalle">
      <h2>{titulo}</h2>
      <img src={img} alt={titulo} />
      <span>{estadisticas}</span>
      {calificacion && <p>Calificación: {calificacion}/10</p>}

      <div className="effect-container">
        <h3>Efectos:</h3>
        {Object.entries(effects).map(([effectKey, effectValue]) => {
          if (effectValue) {
            return (
              <div key={effectKey} className="effect">
                <span className="effect-icon">
                  {effectIconMap[effectKey] ?? "🔧"}{" "}
                  {/* Icono o un símbolo por defecto */}
                </span>
                <strong>{effectKey.replace(/_/g, " ")}:</strong> +
                {effectValue.number}
                (Turno: {effectValue.turn_effect})
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default ObjDetalle;
