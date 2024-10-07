import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/Inventario.module.css";
import Combatiente from '../interfaces/Combatiente';


// Importaciones de imágenes (asumimos que ya existen)
import AtaduraCarmesi from '../assets/AtaduraCarmesi.png';
import CaidaDeFuego from '../assets/CaidaDeFuego.png';
import CoronaDeHielo from '../assets/CoronaDeHielo.png';
import DefensaDelEnfurecido from '../assets/DefensaDelEnfurecido.png';
import MagmaArdiente from '../assets/MagmaArdiente.png';
import ManoDelDesterrado from '../assets/ManoDelDesterrado.png';
import PieDeAtleta from '../assets/PieDeAtleta.png';
import PunoLucido from '../assets/PunoLucido.png';
import PunosEnLlamas from '../assets/PunosEnLlamas.png';
import SangreCruel from '../assets/SangreCruel.png';
import TunicaArcana from '../assets/TunicaArcana.png';
import Ventisca from '../assets/Ventisca.png';

import EspadaDeUnaMano from '../assets/EspadaDeUnaMano.png';
import EspadaDeDosManos from '../assets/Espada De Dos Manos.png';
import OrbeDeManosArdiente from '../assets/OrbeDeManosArdiente.png';
import BaculoDePermafrost from '../assets/BaculoDePermafrost.png';
import DagaPurulenta from '../assets/DagaPurulenta.png';
import MacheteBendito from '../assets/MacheteBendito.png';
import EscudoDeDragon from '../assets/EscudoDeDragon.png';
import PiedraDeAfilar from '../assets/PiedraDeAfilar.png';
import FuegoFatuo from '../assets/FuegoFatuo.png';
import VenasHeladas from '../assets/VenasHeladas.png';
import VisionBorrosa from '../assets/Vision Borrosa.png';
import SierraSangrienta from '../assets/SierraSangrienta.png';

import AnilloParaPiroExplosion from '../assets/AnilloParaPiro-Explosion.png';
import EmpunaduraDeFuria from '../assets/EmpunaduraDeFuria.png';
import LibroDeLaVentiscaHelada from '../assets/LibroDeLaVentiscaHelada.png';
import MancuernaYugular from '../assets/MancuernaYugular.png';
import PinchosDeEscudo from '../assets/PinchosDeEscudo.png';
import VenenoLacerante from '../assets/VenenoLacerante.png';

interface Equipment {
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

const equipments: Equipment[] = [
  // Armaduras
  { id: 'armor1', name: 'Defensa del enfurecido', type: 'Armadura', slot: 'Pecho', image: DefensaDelEnfurecido, effects: { defense: 2, health: 2 }, dropChance: 5, compatibleHeroes: ['Tanque'], Heroe: 'Guerrero' },
  { id: 'armor2', name: 'Puño lúcido', type: 'Armadura', slot: 'Guantes', image: PunoLucido, effects: { defense: 2, health: 1 }, dropChance: 2, compatibleHeroes: ['Armas'], Heroe: 'Guerrero' },
  { id: 'armor3', name: 'Túnica arcana', type: 'Armadura', slot: 'Pecho', image: TunicaArcana, effects: { defense: 1, health: 2 }, dropChance: 3, compatibleHeroes: ['Fuego'], Heroe: 'Mago' },
  { id: 'armor4', name: 'Corona de hielo', type: 'Armadura', slot: 'Casco', image: CoronaDeHielo, effects: { defense: 1, health: 1 }, dropChance: 5, compatibleHeroes: ['Hielo'], Heroe: 'Mago' },
  { id: 'armor5', name: 'Mano del desterrado', type: 'Armadura', slot: 'Guantes', image: ManoDelDesterrado, effects: { defense: 2, health: 1 }, dropChance: 4, compatibleHeroes: ['Veneno'], Heroe: 'Picaro' },
  { id: 'armor6', name: 'Pie de atleta', type: 'Armadura', slot: 'Zapatos', image: PieDeAtleta, effects: { defense: 2, health: 1 }, dropChance: 1, compatibleHeroes: ['Machete'], Heroe: 'Picaro' },
  { id: 'armor7', name: 'Magma Ardiente', type: 'Armadura', slot: 'Casco', image: MagmaArdiente, effects: { defense: 2, health: 1 }, dropChance: 5, compatibleHeroes: ['Tanque'], Heroe: 'Guerrero' },
  { id: 'armor8', name: 'Puños en llamas', type: 'Armadura', slot: 'Brazaletes', image: PunosEnLlamas, effects: { defense: 1, health: 1 }, dropChance: 2, compatibleHeroes: ['Armas'], Heroe: 'Guerrero' },
  { id: 'armor9', name: 'Caída de fuego', type: 'Armadura', slot: 'Pantalón', image: CaidaDeFuego, effects: { defense: 1, health: 1 }, dropChance: 3, compatibleHeroes: ['Fuego'], Heroe: 'Mago' },
  { id: 'armor10', name: 'Ventisca', type: 'Armadura', slot: 'Pecho', image: Ventisca, effects: { defense: 1, health: 2 }, dropChance: 5, compatibleHeroes: ['Hielo'], Heroe: 'Mago' },
  { id: 'armor11', name: 'Atadura carmesí', type: 'Armadura', slot: 'Pecho', image: AtaduraCarmesi, effects: { defense: 1, health: 2 }, dropChance: 4, compatibleHeroes: ['Veneno'], Heroe: 'Picaro' },
  { id: 'armor12', name: 'Sangre cruel', type: 'Armadura', slot: 'Brazaletes', image: SangreCruel, effects: { defense: 1, health: 1 }, dropChance: 1, compatibleHeroes: ['Machete'], Heroe: 'Picaro' },
  
  // Armas
  { id: 'weapon1', name: 'Espada de una mano', type: 'Arma', slot: 'Arma', image: EspadaDeUnaMano, effects: { attack: 1, criticalChance: 1 }, dropChance: 3, compatibleHeroes: ['Tanque'], Heroe: 'Guerrero' },
  { id: 'weapon2', name: 'Espada de dos manos', type: 'Arma', slot: 'Arma', image: EspadaDeDosManos, effects: { attack: 1, criticalChance: 3 }, dropChance: 1, compatibleHeroes: ['Armas'], Heroe: 'Guerrero' },
  { id: 'weapon3', name: 'Orbe de manos ardientes', type: 'Arma', slot: 'Arma', image: OrbeDeManosArdiente, effects: { attack: 1, criticalChance: 3 }, dropChance: 1, compatibleHeroes: ['Fuego'], Heroe: 'Mago' },
  { id: 'weapon4', name: 'Báculo de Permafrost', type: 'Arma', slot: 'Arma', image: BaculoDePermafrost, effects: { opponentAttack: -1, opponentCriticalChance: -2 }, dropChance: 2, compatibleHeroes: ['Hielo'], Heroe: 'Mago' },
  { id: 'weapon5', name: 'Daga purulenta', type: 'Arma', slot: 'Arma', image: DagaPurulenta, effects: { damageOverTime: 1, criticalChance: 3, duration: 2 }, dropChance: 1, compatibleHeroes: ['Veneno'], Heroe: 'Picaro' },
  { id: 'weapon6', name: 'Machete bendito', type: 'Arma', slot: 'Arma', image: MacheteBendito, effects: { attack: 2, criticalChance: 2 }, dropChance: 1, compatibleHeroes: ['Machete'], Heroe: 'Picaro' },
  { id: 'weapon7', name: 'Escudo de dragón', type: 'Arma', slot: 'Arma', image: EscudoDeDragon, effects: { defense: 1, attack: 2 }, dropChance: 3, compatibleHeroes: ['Tanque'], Heroe: 'Guerrero' },
  { id: 'weapon8', name: 'Piedra de afilar', type: 'Arma', slot: 'Arma', image: PiedraDeAfilar, effects: { attack: 1, criticalChance: 1 }, dropChance: 1, compatibleHeroes: ['Armas'], Heroe: 'Guerrero' },
  { id: 'weapon9', name: 'Fuego fatuo', type: 'Arma', slot: 'Arma', image: FuegoFatuo, effects: { attack: 1, opponentAttack: -1 }, dropChance: 1, compatibleHeroes: ['Fuego'], Heroe: 'Mago' },
  { id: 'weapon10', name: 'Venas heladas', type: 'Arma', slot: 'Arma', image: VenasHeladas, effects: { damageOverTime: 2, duration: 2 }, dropChance: 2, compatibleHeroes: ['Hielo'], Heroe: 'Mago' },
  { id: 'weapon11', name: 'Visión borrosa', type: 'Arma', slot: 'Arma', image: VisionBorrosa, effects: { opponentAttack: -1, opponentCriticalChance: -2 }, dropChance: 1, compatibleHeroes: ['Veneno'], Heroe: 'Picaro' },
  { id: 'weapon12', name: 'Sierra sangrienta', type: 'Arma', slot: 'Arma', image: SierraSangrienta, effects: { attack: 2, criticalChance: 2 }, dropChance: 1, compatibleHeroes: ['Machete'], Heroe: 'Picaro' },

  //Items
  { id: 'item1', name: 'Pinchos de escudo', type: 'Item', slot: 'Item', image: PinchosDeEscudo, effects: { specialEffect: "Si el ataque del oponente es menor que la defensa del guerrero, el oponente recibe +1 de daño" }, dropChance: 20, compatibleHeroes: ['Tanque'], Heroe: 'Guerrero' },
  { id: 'item2', name: 'Empuñadura de Furia', type: 'Item', slot: 'Item', image: EmpunaduraDeFuria, effects: { damageOverTime: 1, duration: 2, health: -1 }, dropChance: 10, compatibleHeroes: ['Armas'], Heroe: 'Guerrero' },
  { id: 'item3', name: 'Anillo para Piro-explosión', type: 'Item', slot: 'Item', image: AnilloParaPiroExplosion, effects: { attack: 3 }, dropChance: 7, compatibleHeroes: ['Fuego'], Heroe: 'Mago' },
  { id: 'item4', name: 'Libro de la ventisca helada', type: 'Item', slot: 'Item', image: LibroDeLaVentiscaHelada, effects: { attack: 2 }, dropChance: 10, compatibleHeroes: ['Hielo'], Heroe: 'Mago' },
  { id: 'item5', name: 'Veneno lacerante', type: 'Item', slot: 'Item', image: VenenoLacerante, effects: { specialEffect: "-1 al poder de oponente. Solo aplica cada dos turnos." }, dropChance: 9, compatibleHeroes: ['Veneno'], Heroe: 'Picaro' },
  { id: 'item6', name: 'Mancuerna yugular', type: 'Item', slot: 'Item', image: MancuernaYugular, effects: { specialEffect: "Explota por 2 el valor en turno causado por la cierra sangrienta en el oponente" }, dropChance: 8, compatibleHeroes: ['Machete'], Heroe: 'Picaro' },
];

const ITEMS_PER_PAGE = 16;
const MAX_BAG_ITEMS = 6;


const Inventario: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedHero = location.state?.hero as Combatiente | undefined;
  
  
  const [equippedItems, setEquippedItems] = useState<Combatiente['equippedItems']>(
    selectedHero?.equippedItems || { armor1: null, armor2: null, weapon: null, item: null }
  );

  
  
  const [inventoryItems, setInventoryItems] = useState<Equipment[]>(equipments);
  const [selectedItem, setSelectedItem] = useState<Equipment | null>(null);
  const [isHeroExcited, setIsHeroExcited] = useState(false);
  const [bagItems, setBagItems] = useState<Equipment[]>([]);
  const [notification, setNotification] = useState<string | null>(null);
  const [inventoryPage, setInventoryPage] = useState(0);
  const [bagPage, setBagPage] = useState(0);
  
  
  const [baseStats, setBaseStats] = useState({
    attack: 0,
    defense: 0,
    health: 0,
    maxHealth: 0,
  });

  const [heroStats, setHeroStats] = useState({
    attack: 0,
    defense: 0,
    health: 0,
    maxHealth: 0,
    criticalChance: 0,
  });

  const compatibleItems = inventoryItems.filter(item => 
    item.compatibleHeroes.includes(selectedHero?.type || '')
  );

  useEffect(() => {
    if (selectedHero) {
      setBaseStats({
        attack: selectedHero.baseAttack || selectedHero.attack,
        defense: selectedHero.baseDefense || selectedHero.defense,
        health: selectedHero.baseHealth || selectedHero.health,
        maxHealth: selectedHero.baseMaxHealth || selectedHero.maxHealth,
      });
      setEquippedItems(selectedHero.equippedItems || { armor1: null, armor2: null, weapon: null, item: null });
      setBagItems(selectedHero.bagItems || []);
      
      // Filtrar los items compatibles con el héroe seleccionado, excluyendo los que están en la bolsa
      const filteredItems = equipments.filter(item => 
        (item.compatibleHeroes.includes(selectedHero.type) || item.Heroe === selectedHero.type) &&
        !selectedHero.bagItems?.some(bagItem => bagItem.id === item.id)
      );
      setInventoryItems(filteredItems);
    }
  }, [selectedHero]);



  const calculateStats = (base: typeof baseStats, equipped: typeof equippedItems) => {
    let totalAttack = base.attack;
    let totalDefense = base.defense;
    let totalHealth = base.health;
    let totalCriticalChance = 0;

    Object.values(equipped).forEach(item => {
      if (item) {
        totalAttack += item.effects.attack || 0;
        totalDefense += item.effects.defense || 0;
        totalHealth += item.effects.health || 0;
        totalCriticalChance += item.effects.criticalChance || 0;
      }
    });

    return {
      attack: totalAttack,
      defense: totalDefense,
      health: totalHealth,
      maxHealth: Math.max(base.maxHealth, totalHealth),
      criticalChance: totalCriticalChance,
    };
  };
  useEffect(() => {
    const newStats = calculateStats(baseStats, equippedItems);
    setHeroStats(newStats);
  }, [baseStats, equippedItems]);

  const updateHeroStats = () => {
    if (selectedHero) {
      let totalAttack = baseStats.attack;
      let totalDefense = baseStats.defense;
      let totalHealth = baseStats.health;
      let totalCriticalChance = 0;
  
      // Aplicar efectos de ítems equipados
      Object.entries(equippedItems).forEach(([slot, item]) => {
        if (item && slot !== 'item') {
          totalAttack += item.effects.attack || 0;
          totalDefense += item.effects.defense || 0;
          totalHealth += item.effects.health || 0;
          totalCriticalChance += item.effects.criticalChance || 0;
        }
      });
  
      // Aplicar efectos de ítems en la bolsa
      bagItems.forEach(item => {
        totalAttack += item.effects.attack || 0;
        totalDefense += item.effects.defense || 0;
        totalHealth += item.effects.health || 0;
        totalCriticalChance += item.effects.criticalChance || 0;
        
        if (item.effects.specialEffect) {
          // Aquí puedes manejar los efectos especiales si es necesario
          console.log(`Efecto especial de ${item.name}: ${item.effects.specialEffect}`);
          // Implementa la lógica para aplicar el efecto especial
        }
      });
  
      setHeroStats({
        attack: totalAttack,
        defense: totalDefense,
        health: totalHealth,
        maxHealth: Math.max(baseStats.maxHealth, totalHealth),
        criticalChance: totalCriticalChance,
      });
    }
  };

  useEffect(() => {
    updateHeroStats();
  }, [equippedItems, bagItems, baseStats]);

 
  
 
  const equipItem = (item: Equipment) => {
    if (!selectedHero || !item.compatibleHeroes.includes(selectedHero.type)) {
      showNotification(`${item.name} no es compatible con ${selectedHero?.name || 'este héroe'}`);
      return;
    }
  
    if (item.type === 'Armadura') {
      const emptySlot = equippedItems.armor1 === null ? 'armor1' : 'armor2';
      if (equippedItems[emptySlot] === null) {
        setEquippedItems(prev => ({ ...prev, [emptySlot]: item }));
        setInventoryItems(prev => prev.filter(i => i.id !== item.id));
        showNotification(`¡${item.name} equipado en ${emptySlot}!`);
      } else {
        showNotification("No hay slots de armadura disponibles");
        return;
      }
    } else if (item.type === 'Arma') {
      const previousItem = equippedItems.weapon;
      setEquippedItems(prev => ({ ...prev, weapon: item }));
      setInventoryItems(prev => prev.filter(i => i.id !== item.id));
      if (previousItem) {
        setInventoryItems(prev => [...prev, previousItem]);
      }
      showNotification(`¡${item.name} equipado como arma!`);
    } else if (item.type === 'Item') {
      addToBag(item);
    }
    setIsHeroExcited(true);
    setTimeout(() => setIsHeroExcited(false), 1000);
  };

  const unequipItem = (slot: 'armor1' | 'armor2' | 'weapon' | 'item') => {
    const item = equippedItems[slot];
    if (item) {
      setEquippedItems(prev => ({ ...prev, [slot]: null }));
      setInventoryItems(prev => [...prev, item]);
      showNotification(`${item.name} desequipado de ${slot}`);
      updateHeroStats(); // Añade esta línea

    }
  };
  const saveEquipment = () => {
    if (selectedHero) {
      const updatedHero: Combatiente = {
        ...selectedHero,
        ...heroStats,
        equippedItems,
        bagItems,
        baseAttack: baseStats.attack,
        baseDefense: baseStats.defense,
        baseHealth: baseStats.health,
        baseMaxHealth: baseStats.maxHealth,
      };
      
      // Crear una lista de todos los IDs de ítems equipados y en la bolsa
      const equippedAndBagItemIds = [
        ...Object.values(equippedItems).filter(item => item !== null).map(item => item!.id),
        ...bagItems.map(item => item.id)
      ];
  
      // Filtrar el inventario para excluir los ítems equipados y en la bolsa
      const updatedInventoryItems = inventoryItems.filter(item => !equippedAndBagItemIds.includes(item.id));
      
      navigate('/lobby', { 
        state: { 
          selectedHero: updatedHero,
          inventoryItems: updatedInventoryItems,
          heroesData: location.state?.heroesData?.map((hero: Combatiente) => 
            hero._id === updatedHero._id ? updatedHero : hero
          )
        }
      });
    } else {
      alert('No hay héroe seleccionado para guardar la equipación');
    }
  };

  const addToBag = (item: Equipment) => {
    if (item.type !== 'Item') {
      showNotification("Solo los ítems pueden ser añadidos a la bolsa");
      return;
    }
    
    if (bagItems.length < MAX_BAG_ITEMS) {
      setBagItems(prev => [...prev, item]);
      setInventoryItems(prev => prev.filter(i => i.id !== item.id));
      showNotification(`${item.name} añadido a la bolsa`);
      updateHeroStats();
    } else {
      showNotification("La bolsa está llena");
    }
  };
  const removeFromBag = (item: Equipment) => {
    setBagItems(prev => prev.filter(i => i.id !== item.id));
    if (!inventoryItems.some(i => i.id === item.id)) {
      setInventoryItems(prev => [...prev, item]);
    }
    showNotification(`${item.name} removido de la bolsa`);
    updateHeroStats();
  };
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const paginatedInventoryItems = inventoryItems.slice(
    inventoryPage * ITEMS_PER_PAGE,
    (inventoryPage + 1) * ITEMS_PER_PAGE
  );

  const paginatedBagItems = bagItems.slice(
    bagPage * ITEMS_PER_PAGE,
    (bagPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <div className={styles.inventarioContainer}>
      <div className={styles.leftPanel}>
        <div className={styles.heroSection}>
          <div className={`${styles.heroImage} ${isHeroExcited ? styles.excited : ''}`}>
            <img src={selectedHero?.image} alt={selectedHero?.name} />
          </div>
         <div className={styles.equippedItems}>
  {['armor1', 'armor2', 'weapon'].map((slot) => (
    <div
      key={slot}
      className={`${styles.equipSlot} ${styles[slot]}`}
      onClick={() => equippedItems[slot as keyof typeof equippedItems] && unequipItem(slot as 'armor1' | 'armor2' | 'weapon')}
    >
      {equippedItems[slot as keyof typeof equippedItems] && (
        <img 
          src={equippedItems[slot as keyof typeof equippedItems]!.image} 
          alt={equippedItems[slot as keyof typeof equippedItems]!.name} 
        />
      )}
    </div>
  ))}
</div>
        </div>
        <div className={styles.statsSection}>
          <h2>Estadísticas</h2>
          <ul className={styles.statsList}>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Nivel</span>
              <span className={styles.statValue}>{selectedHero?.level}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Vida</span>
              <span className={styles.statValue}>{selectedHero?.health}/{selectedHero?.maxHealth}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Ataque</span>
              <span className={styles.statValue}>{selectedHero?.attack}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Defensa</span>
              <span className={styles.statValue}>{selectedHero?.defense}</span>
            </li>
            <li className={styles.statItem}>
              <span className={styles.statLabel}>Poder</span>
              <span className={styles.statValue}>{selectedHero?.powerPoints}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className={styles.rightPanel}>
        <div className={styles.inventorySection}>
          <div className={styles.sectionHeader}>
            <button
              className={styles.paginationArrow}
              onClick={() => setInventoryPage(prev => Math.max(0, prev - 1))}
              disabled={inventoryPage === 0}
            >
              &#9664; {/* Flecha izquierda */}
            </button>
            <h2 className={styles.sectionTitle}>Inventario</h2>
            <button
              className={styles.paginationArrow}
              onClick={() => setInventoryPage(prev => Math.min(Math.ceil(inventoryItems.length / ITEMS_PER_PAGE) - 1, prev + 1))}
              disabled={inventoryPage === Math.ceil(inventoryItems.length / ITEMS_PER_PAGE) - 1}
            >
              &#9654; {/* Flecha derecha */}
            </button>
          </div>
          <div className={styles.itemGrid}>
            {paginatedInventoryItems.map(item => (
              <div
                key={item.id}
                className={`${styles.item} ${styles[item.Heroe]}`}
                onClick={() => setSelectedItem(item)}
              >
                <img src={item.image} alt={item.name} />
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.bagSection}>
          <div className={styles.sectionHeader}>
            <button
              className={styles.paginationArrow}
              onClick={() => setBagPage(prev => Math.max(0, prev - 1))}
              disabled={bagPage === 0}
            >
              &#9664; {/* Flecha izquierda */}
            </button>
            <h2 className={styles.sectionTitle}>Bolsa</h2>
            <button
              className={styles.paginationArrow}
              onClick={() => setBagPage(prev => Math.min(Math.ceil(bagItems.length / ITEMS_PER_PAGE) - 1, prev + 1))}
              disabled={bagPage === Math.ceil(bagItems.length / ITEMS_PER_PAGE) - 1}
            >
              &#9654; {/* Flecha derecha */}
            </button>
          </div>
          <div className={styles.bagGrid}>
            {paginatedBagItems.map((item, index) => (
              <div 
                key={index} 
                className={styles.bagSlot}
                onClick={() => removeFromBag(item)}
              >
                <img src={item.image} alt={item.name} />
              </div>
            ))}
            {[...Array(ITEMS_PER_PAGE - paginatedBagItems.length)].map((_, index) => (
              <div key={`empty-${index}`} className={styles.bagSlot}></div>
            ))}
          </div>
        </div>
      </div>
  
      {selectedItem && (
        <div className={styles.itemDetailsOverlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.itemDetailsCard} onClick={e => e.stopPropagation()}>
            <h3>{selectedItem.name}</h3>
            <p>Tipo: {selectedItem.type}</p>
            <p>Heroe: {selectedItem.Heroe}</p>
            <div className={styles.actionButtons}>
              {(selectedItem.type === 'Armadura' || selectedItem.type === 'Arma') && (
                <button onClick={() => {equipItem(selectedItem); setSelectedItem(null);}}>Equipar</button>
              )}
              <button onClick={() => {addToBag(selectedItem); setSelectedItem(null);}}>Añadir a la bolsa</button>
            </div>
          </div>
        </div>
      )}
  
      {notification && (
        <div className={styles.notification}>
          {notification}
        </div>
      )}

      <button className={styles.saveButton} onClick={saveEquipment}>Guardar equipación</button>
    </div>
  );
}

export default Inventario;
