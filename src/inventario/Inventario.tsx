import React, { useState, useEffect } from "react";
import {
  DndContext,
  useDroppable,
  useDraggable,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import "./Style.css";
import BoxEstadisticas from "./componentes/estadisticas";
import ObjDetalle from "./componentes/objetoDetalle";
import axios from "axios";
import Environment from "../shared/Environment";
import { useAuth } from "../hooks/useAuth";

interface DroppableCuadradoProps {
  id: UniqueIdentifier;
  extraClasses?: string;
  children?: React.ReactNode;
}

interface DraggableItemProps {
  id: UniqueIdentifier;
  content: string;
  image: string; // Agregado para mostrar la imagen del objeto
}

interface InventoryItem {
  _id: string;
  name: string;
  image: string;
  active: boolean;
}

function Inventario() {
  const [items, setItems] = useState<{ [key: string]: InventoryItem | null }>(
    {}
  );
  const [inventoryPage, setInventoryPage] = useState(1);
  //const [selectedHero, setSelectedHero] = useState<Hero | null>(null);

  const user = useAuth(s => s.user);

  useEffect(() => {
    const obtenerInventario = async () => {
      try {
        const response = await axios.get(
          `${Environment.getDomainInventory()}/inventary/${user?.iduser}`
        );
        const formattedItems = response.data.inventario.reduce(
          (
            acc: { [key: string]: InventoryItem },
            item: { objetoId: InventoryItem; active: boolean },
            index: number
          ) => {
            acc[`inventory${index + 1}`] = {
              _id: item.objetoId._id,
              name: item.objetoId.name,
              image: item.objetoId.image,
              active: item.active,
            };
            return acc;
          },
          {}
        );
        setItems(formattedItems);
      } catch (error) {
        console.error("Error al obtener inventario:", error);
      }
    };

    const obtenerInventario_game = async () => {
      try {
        const response = await axios.get(
          `${Environment.getDomainInventory()}/inventary_game/${user?.iduser}`
        );
        const formattedItems = response.data.inventario.reduce(
          (
            acc: { [key: string]: InventoryItem },
            item: { objetoId: InventoryItem; active: boolean },
            index: number
          ) => {
            acc[`bag${index + 1}`] = {
              _id: item.objetoId._id,
              name: item.objetoId.name,
              image: item.objetoId.image,
              active: item.active,
            };
            return acc;
          },
          {}
        );
        setItems(formattedItems);
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
      <div className="container_inv">
        <ObjDetalle
          titulo="hola"
          img="Armaduras/AtaduraCarmesi"
          calificacion={2}
          estadisticas="muchas"
        />

        <div
          className="section1"
          style={{ fontFamily: "OCR A", fontSize: "20px" }}
        >
          <div className="estadisticas">
            <h1>ESTADÍSTICA</h1>
            <BoxEstadisticas titulo="Nivel" numero={45} />
            <BoxEstadisticas titulo="Vida" numero={100} />
            <BoxEstadisticas titulo="Poder" numero={80} />
            <BoxEstadisticas titulo="Defensa" numero={70} />
            <BoxEstadisticas titulo="Ataque" numero={90} />
            <BoxEstadisticas titulo="Daño" numero={60} />
          </div>
          <div className="habilidades">
            <h1>HABILIDADES ÉPICAS</h1>
            {/* {epicAbilities.map((ability) => (
              <div key={ability.id} className="epic-ability">
                {ability.name}
              </div>
            ))} */}
          </div>
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
            <InventoryGrid baseId="inventory" items={items} />
          </div>
          <h1>BOLSA</h1>
          <div className="bolsa">
            <InventoryGrid baseId="bag" items={items} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

const InventoryGrid: React.FC<{
  baseId: string;
  items: { [key: string]: InventoryItem | null };
}> = ({ baseId, items }) => {
  return (
    <>
      {Array.from({ length: 16 }, (_, index) => (
        <DroppableCuadrado
          key={`${baseId}${index + 1}`}
          id={`${baseId}${index + 1}`}
        >
          {items[`${baseId}${index + 1}`] && (
            <DraggableItem
              id={items[`${baseId}${index + 1}`]!._id}
              content={items[`${baseId}${index + 1}`]!.name}
              image={items[`${baseId}${index + 1}`]!.image}
            />
          )}
        </DroppableCuadrado>
      ))}
    </>
  );
};

const DroppableCuadrado: React.FC<DroppableCuadradoProps> = ({
  id,
  extraClasses = "",
  children,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`cuadrado ${extraClasses} ${isOver ? "over" : ""}`}
    >
      {children}
    </div>
  );
};

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  content,
  image,
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
    >
      <img
        src={image}
        alt={content}
        style={{ width: "50px", height: "50px" }}
      />
    </div>
  );
};

export default Inventario;
