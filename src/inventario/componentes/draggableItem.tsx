import { useDraggable, UniqueIdentifier } from "@dnd-kit/core";

interface InventoryItem {
  _id: string;
  name: string;
  image: string;
  active: boolean;
  effects?: Effects; // Se añaden los efectos opcionales
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

interface DraggableItemProps {
  id: UniqueIdentifier;
  content: string;
  image: string; // Agregado para mostrar la imagen del objeto
  onHover: (item: InventoryItem | null) => void; // Nueva prop para manejar el hover
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  content,
  image,
  onHover,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      className="draggable"
      style={style}
      {...listeners}
      {...attributes}
      onMouseEnter={() =>
        onHover({ _id: String(id), name: content, image, active: true })
      } // Activar hover
      onMouseLeave={() => onHover(null)} // Desactivar hover
    >
      <img
        src={image}
        alt={content}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default DraggableItem;
