import { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import './Style.css'
//import BoxEstadisticas from "./componentes/estadisticas";
import ObjDetalle from "./componentes/objetoDetalle";
import axios from "axios";
import DroppableCuadrado from "./componentes/droppableCuadrado";
import DraggableItem from "./componentes/draggableItem";
import InventoryGrid from "./componentes/InventaryGrid";
import Environment from "../shared/Environment";
import { useAuth } from "../hooks/useAuth";

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

function Inventario() {
  const user = useAuth(s => s.user);

  const [items, setItems] = useState<{ [key: string]: InventoryItem | null }>(
    {}
  );
  const [inventoryPage, setInventoryPage] = useState(1);
  const [hoveredItem, setHoveredItem] = useState<InventoryItem | null>(null); // Estado para el objeto "hovered"
  //const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  useEffect(() => {
    const obtenerInventario = async () => {
      try {
        const response = await fetch(`${Environment.getDomainInventory()}/inventary/${user?.iduser.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json()
              const formattedItems = data.inventario.reduce(
                (
                  acc: { [key: string]: InventoryItem },
                  item: {
                    objetoId: InventoryItem;
                    active: boolean;
                    effects?: Effects;
                  },
                  index: number
                ) => {
                  acc[`inventory${index + 1}`] = {
                    _id: item.objetoId._id,
                    name: item.objetoId.name,
                    image: item.objetoId.image,
                    active: item.active,
                    effects: item.objetoId.effects || {}, // Se añaden los efectos aquí
                  };
                  return acc;
                },
                {}
              );
              setItems(formattedItems);
            }
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };

    const obtenerInventario_game = async () => {
      try {
        const response = await fetch(`${Environment.getDomainInventory()}/inventary_game/${user?.iduser.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
            const data = await response.json()
            const formattedItems = data.inventario.reduce(
              (
                acc: { [key: string]: InventoryItem },
                item: {
                  objetoId: InventoryItem;
                  active: boolean;
                  effects?: Effects;
                },
                index: number
              ) => {
                acc[`bag${index + 1}`] = {
                  _id: item.objetoId._id,
                  name: item.objetoId.name,
                  image: item.objetoId.image,
                  active: item.active,
                  effects: item.objetoId.effects || {}, // Se añaden los efectos aquí
                };
                return acc;
              },
              {}
            );
            setItems(formattedItems);
          }
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };

    obtenerInventario();
    obtenerInventario_game();
  }, []);

  /*   const heroes: Hero[] = [
    { id: "hero1", name: "Guerrero", image: "/personajeEjemplo.png" },
    { id: "hero2", name: "Mago", image: "/hero-mage.png" },
    { id: "hero3", name: "Arquero", image: "/hero-archer.png" },
    { id: "hero4", name: "Asesino", image: "/hero-assassin.png" },
  ]; */

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over) {
      setItems((prevItems) => {
        const newItems = { ...prevItems };
        const sourceKey = Object.keys(newItems).find(
          (key) => newItems[key]?._id === active.id
        );
        const targetKey = over.id as string;

        if (sourceKey && targetKey) {
          swapItems(newItems, sourceKey, targetKey);
        }

        return newItems;
      });
    }
  };

  const swapItems = (
    items: { [key: string]: InventoryItem | null },
    sourceKey: string,
    targetKey: string
  ) => {
    const sourceItem = items[sourceKey];
    const targetItem = items[targetKey];
    items[sourceKey] = targetItem;
    items[targetKey] = sourceItem;
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="container">
        <div
          className="section1"
          style={{ fontFamily: "OCR A", fontSize: "20px" }}
        >
          {/* Mostrar el detalle del objeto que está siendo hovered */}
          {hoveredItem && (
            <ObjDetalle
              titulo={hoveredItem.name}
              img={hoveredItem.image}
              calificacion={0}
              estadisticas="Estadísticas dinámicas aquí"
              effects={hoveredItem.effects || {}}
            />
          )}

          {/* <div className="estadisticas">
            <h1>ESTADÍSTICA</h1>
            <BoxEstadisticas titulo="Nivel" numero={45} />
            <BoxEstadisticas titulo="Vida" numero={100} />
            <BoxEstadisticas titulo="Poder" numero={80} />
            <BoxEstadisticas titulo="Defensa" numero={70} />
            <BoxEstadisticas titulo="Ataque" numero={90} />
            <BoxEstadisticas titulo="Daño" numero={60} />
          </div> */}
          {/* <div className="habilidades">
            <h1>HABILIDADES ÉPICAS</h1>
            {/* {epicAbilities.map((ability) => (
              <div key={ability.id} className="epic-ability">
                {ability.name}
              </div>
            ))} 
          </div> */}
        </div>
        <div className="section2">
          <div className="sub-section1">
            {/* Título de la Sección */}
            <p className="heroes-title">HÉROES</p>

            {/* Contenedor Principal del Cuadro de Héroes */}
            <div className="hero-container">
              {/* Tarjetas de Héroes */}
              <div className="hero-card">
                <img
                  src="mago.jpeg"
                  className="w-full h-full object-cover"
                  alt="heroe"
                />
              </div>
              <div className="hero-card"></div>
              <div className="hero-card"></div>
              <div className="hero-card"></div>
            </div>
          </div>

          {/* <div className="sub-section1">
            <h1>HÉROES</h1>
            <div className="hero-selection">
              {heroes.map((hero) => (
                <div
                  key={hero.id}
                  className={`hero-option ${
                    selectedHero?.id === hero.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedHero(hero)}
                >
                  <img src={hero.image} alt={hero.name} />
                  <span>{hero.name}</span>
                </div>
              ))}
            </div>
          </div> */}
          <div className="sub-section2">
            <div className="sub-sub-section1">
              <div className="containerC">
                {["cuadrado1", "cuadrado2", "cuadrado3"].map(
                  (cuadradoId, index) => (
                    <DroppableCuadrado
                      key={cuadradoId}
                      id={cuadradoId}
                      extraClasses={index % 2 === 0 ? "mvr" : ""}
                    >
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
                  )
                )}
              </div>
            </div>
            <div className="sub-sub-section2">
              <img
                src="/personajeEjemplo.png"
                style={{ width: "190px", marginTop: "0px" }}
              />
            </div>
            <div className="sub-sub-section3">
              <div className="containerC">
                {["cuadrado4", "cuadrado5", "cuadrado6"].map(
                  (cuadradoId, index) => (
                    <DroppableCuadrado
                      key={cuadradoId}
                      id={cuadradoId}
                      extraClasses={index % 2 === 0 ? "mvl" : ""}
                    >
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
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="section3">
          <h1>INVENTARIO</h1>
          <div className="inventory-pagination">
            <button
              onClick={() => setInventoryPage(Math.max(1, inventoryPage - 1))}
            >
              ◀
            </button>
            <span>{inventoryPage}</span>
            <button onClick={() => setInventoryPage(inventoryPage + 1)}>
              ▶
            </button>
          </div>
          <div className="inventario">
            <InventoryGrid
              baseId="inventory"
              items={items}
              setHoveredItem={setHoveredItem}
            />
          </div>
          <h1>BOLSA</h1>
          <div className="bolsa">
            <InventoryGrid
              baseId="bag"
              items={items}
              setHoveredItem={setHoveredItem}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Inventario;
