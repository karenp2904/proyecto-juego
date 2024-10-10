import DroppableCuadrado from "./droppableCuadrado";
import DraggableItem from "./draggableItem";

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

const InventoryGrid: React.FC<{
  baseId: string;
  items: { [key: string]: InventoryItem | null };
  setHoveredItem: (item: InventoryItem | null) => void;
}> = ({ baseId, items, setHoveredItem }) => {
  return (
    <>
      {Array.from({ length: 12 }, (_, index) => {
        const cuadradoId = `${baseId}${index + 1}`;
        return (
          <DroppableCuadrado key={cuadradoId} id={cuadradoId}>
            {items[cuadradoId] && (
              <DraggableItem
                id={items[cuadradoId]!._id}
                content={items[cuadradoId]!.name}
                image={items[cuadradoId]!.image}
                onHover={(item) =>
                  item
                    ? setHoveredItem({
                        _id: item?._id ?? "",
                        name: item?.name ?? "",
                        image: item?.image ?? "",
                        active: item?.active ?? false,
                        effects: items[cuadradoId]?.effects || {},
                      })
                    : null
                }
              />
            )}
          </DroppableCuadrado>
        );
      })}
    </>
  );
};

export default InventoryGrid;
