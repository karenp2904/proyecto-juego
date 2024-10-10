import { FunctionComponent, Dispatch, SetStateAction, useState, useEffect, MouseEvent, useRef    } from "react";
import styles from "../styles/PlayerContainer.module.css";
import '../styles/global.css';
import { Acciones } from "../interfaces/Acciones";
import Combatiente from "../interfaces/Combatiente";
//import batallaData from '../data/batalla.json';
import combatienteData from '../data/combatiente.json';
import accionesData from '../data/acciones.json';
import efectosHeroeData from '../data/Efectosheroe.json'
import EfectosHeroe from "../interfaces/EfectosHeroe";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import Environment from "../../shared/Environment";
import VictoryPanel from "./VictoryPanel";

interface ActiveEffect {
  value: number;
  duration: number;
}

interface BaseStats {
  attack: number;
  defense: number;
  health: number;
  maxHealth: number;
  damage: number;
}

interface ActiveEffects {
  [key: string]: ActiveEffect;
}

interface SpecialEffects {
  florDeLoto?: string;
  [key: string]: string | undefined;
}

interface ExtendedCombatiente extends Combatiente {
  immuneToPhysicalDamage?: boolean;
  magicDamageReduction?: number;
  returnDamage?: number;
}

type PlayerContainerProps = {
  onActionMessage: (actionMessage: ActionMessageType) => void;
  onPlayerAttack: () => void;
  onEnemyAttack: () => void;
  jugador: Combatiente | null;
  enemigo: Combatiente | null;
  setJugador: Dispatch<SetStateAction<Combatiente | null>>;
  setEnemigo: Dispatch<SetStateAction<Combatiente | null>>;
  isOpponentSelected: boolean;
  onTurnEnd: () => void;
  selectedHeroId: string; // Nuevo prop para recibir el ID del héroe seleccionado
  onExitGame: () => void; // New prop for handling exit game action

  
  


};

type ActionMessageType = {
  message: string;
  defenderType: 'player' | 'enemy' | null;
};





// IDs de combatientes

const TURN_TIME = 120; // 120 seconds per turn


const PlayerContainer: FunctionComponent<PlayerContainerProps> = ({
  onActionMessage,
  onPlayerAttack,
  onEnemyAttack,
  jugador ,
  enemigo,
  setJugador,
  setEnemigo,
  isOpponentSelected,
  onTurnEnd,
  selectedHeroId, // Nuevo prop
  onExitGame // Add this new prop



}) => {

  

  const [habilidades, setHabilidades] = useState<Acciones[]>([]);
  const [showSkills, setShowSkills] = useState(false);
  const [isJugadorTurn, setIsJugadorTurn] = useState(true);
  const [powerPointsLeft, setPowerPointsLeft] = useState<number>(jugador?.powerPoints || 0); // Estado para los puntos de poder restantes
  const lastPowerPointsRef = useRef<number>(0);
  const powerPointsRef = useRef<number>(0);
  const [gameOver, setGameOver] = useState(false); // Estado para verificar si el juego ha terminado
  const [habilitado, setHabilitado] = useState(true);
  const [efectosTemporales, setEfectosTemporales] = useState<{ [key: string]: number }>({});
  const [timeLeft, setTimeLeft] = useState(TURN_TIME);
  const [originalStats, setOriginalStats] = useState<{ attack: number; defense: number; damage: number; } | null>(null);
  const [jugadorVidaActual, setJugadorVidaActual] = useState<number | null>(null);
  const [turnEnded, setTurnEnded] = useState(false);
  const [actionUsed, setActionUsed] = useState(false);
  const [shieldThrowUsed, setShieldThrowUsed] = useState(false);
  const [currentEffects, setCurrentEffects] = useState<{ [key: string]: number }>({});
  const [effectsTimer, setEffectsTimer] = useState<NodeJS.Timeout | null>(null);
  const [activeEffects, setActiveEffects] = useState<ActiveEffects>({});
  const navigate = useNavigate();


  const user = useAuth(s => s.user);

  const [baseStats, setBaseStats] = useState({
    attack: 0,
    defense: 0,
    health: 100,
    maxHealth: 100,
    damage: 0, // Inicializamos damage

  });
  const [specialEffects, setSpecialEffects] = useState<SpecialEffects>({});
  const [equipmentEffects, setEquipmentEffects] = useState<BaseStats>({
    attack: 0,
    defense: 0,
    health: 0,
    maxHealth: 0,
    damage: 0,
  });
  const [selectedAction, setSelectedAction] = useState<Acciones | null>(null);
  const [actionPerformed, setActionPerformed] = useState(false);
  const [temporaryEffects, setTemporaryEffects] = useState<ActiveEffects>({});


  

  

  
  const [equippedItems, setEquippedItems] = useState<Combatiente['equippedItems']>({
    armor1: null,
    armor2: null,
    weapon: null,
    item: null,
  });
  
  
  console.log("jugadorContainer renderizando. selectedHeroId:", selectedHeroId);
  

  
  useEffect(() => {
    if (jugador) {
      const newBaseStats = {
        attack: jugador.baseAttack || jugador.attack,
        defense: jugador.baseDefense || jugador.defense,
        health: jugador.baseHealth || jugador.health,
        maxHealth: jugador.baseMaxHealth || jugador.maxHealth,
        damage: jugador.baseDamage || jugador.damage || 0,
      };
      setBaseStats(newBaseStats);
      
      const updatedJugador = applyEquipmentEffects(jugador, newBaseStats);
      setJugador(updatedJugador);
      setPowerPointsLeft(updatedJugador.powerPoints);
      setEquippedItems(updatedJugador.equippedItems);
      
      const habilidadesData = accionesData
        .filter(a => a.heroType === updatedJugador.type && updatedJugador.level >= a.minLevel)
        .map(habilidad => ({
          ...habilidad,
          effects: Object.fromEntries(
            Object.entries(habilidad.effects).filter(([, value]) => value !== undefined)
          )
        }));
      setHabilidades(habilidadesData);
    }
  }, []); 
  const applyEquipmentEffects = (hero: Combatiente, baseStats: BaseStats): Combatiente => {
    let updatedHero = { ...hero };
    let equipmentEffects = { ...baseStats };

    // Aplicar efectos de los ítems equipados
    Object.values(hero.equippedItems).forEach(item => {
      if (item) {
        equipmentEffects.attack += item.effects.attack || 0;
        equipmentEffects.defense += item.effects.defense || 0;
        equipmentEffects.health += item.effects.health || 0;
        equipmentEffects.maxHealth += item.effects.health || 0;
      }
    });

    // Aplicar efectos de los ítems en la bolsa
    hero.bagItems.forEach(item => {
      equipmentEffects.attack += item.effects.attack || 0;
      equipmentEffects.defense += item.effects.defense || 0;
      equipmentEffects.health += item.effects.health || 0;
      equipmentEffects.maxHealth += item.effects.health || 0;
    });

    updatedHero.attack = equipmentEffects.attack;
    updatedHero.defense = equipmentEffects.defense;
    updatedHero.health = equipmentEffects.health;
    updatedHero.maxHealth = equipmentEffects.maxHealth;

    setEquipmentEffects(equipmentEffects);

    return updatedHero;
  };

  
  const updateHeroStats = () => {
    if (jugador && baseStats) {
      console.log("Actualizando estadísticas del héroe. Base stats:", baseStats);
      const updatedJugador = applyEquipmentEffects(jugador, baseStats);
      setJugador(updatedJugador);
      setJugadorVidaActual(updatedJugador.health);
      console.log("Estadísticas actualizadas del héroe:", updatedJugador);
    }
  };
  
  useEffect(() => {
    updateHeroStats();
  }, [equippedItems, jugador?.bagItems]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isJugadorTurn && !gameOver && !turnEnded) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            handleTurnEnd();
            return TURN_TIME;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isJugadorTurn, gameOver, turnEnded]);

  useEffect(() => {
    if (jugador && originalStats) {
      const updatedJugador = { ...jugador };
      updatedJugador.attack = originalStats.attack + (activeEffects.increaseAttack?.value || 0);
      updatedJugador.defense = originalStats.defense + (activeEffects.increaseDefense?.value || 0);
      updatedJugador.damage = originalStats.damage + (activeEffects.increaseDamage?.value || 0);
      setJugador(updatedJugador);
      console.log("Estadísticas actualizadas:", updatedJugador);
    }
  }, [activeEffects, originalStats]);

  const handleTurnEnd = () => {
    if (isJugadorTurn) {
      setTurnEnded(true);
      onActionMessage({
        message: "¡Se acabó el tiempo! Turno del enemigo.",
        defenderType: null
      });
      setIsJugadorTurn(false);
      setTimeout(() => {
        handleTurnoEnemigo();
      }, 1000);
    } else {
      iniciarTurnoJugador();
    }
  };

  useEffect(() => {
    if (gameOver) {
      // No hacer nada si el juego ya ha terminado
      return;
    }
    if (jugador?.health === 0) {
      onActionMessage({
        message: "¡Has perdido la batalla!",
        defenderType: null
      });
      setGameOver(true);    
    } else if (enemigo?.health === 0) {
      onActionMessage({
        message: "¡Has ganado la batalla!",
        defenderType: null
      });
      obtenerCreditos()
      setGameOver(true);
    }
  }, [jugador?.health, enemigo?.health, gameOver]);

  const [Creditos, setCreditos] = useState(0);

  async function setCreditsUser(idUser:number, credits:number){
    // Realizar una solicitud GET con Axios
    try {
        const response = await fetch(`${Environment.getDomain()}/api/setCredits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ iduser: idUser , credits:credits}),
        });
    
        if (response.ok) {
        console.log()
        return response.json()
    
        }else{
        return 0
        } 
    } catch (error) {
        // Captura errores de red o excepciones en la solicitud
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
  }

  const [showVictoryPanel, setShowVictoryPanel] = useState(false);
  const [creditsWon, setCreditsWon] = useState(0);
  
  const obtenerCreditos = async () => {
    if (enemigo?.health === 0) {
      setCreditos(prevCredits => prevCredits + 2);
      setCreditsWon(2); // Créditos ganados

      setShowVictoryPanel(true); // Mostrar panel de victoria
      console.log("gameOver:", gameOver);
      console.log("jugador?.health:", jugador?.health);
      console.log("showVictoryPanel:", showVictoryPanel);
      
      if(user) {
        console.log('creditos')
        const creditos = await setCreditsUser(user?.iduser, (user?.credits + creditsWon));
        console.log(creditos);
      }
    }
  };
  
  const closeVictoryPanel = () => setShowVictoryPanel(false);
 

  const calcularAtaque = (combatiente: Combatiente): number => {
    let dado: number;

    switch (combatiente.type) {
      case "Tanque":
      case "Armas":
        dado = Math.floor(Math.random() * 6) + 1; // 1d6
        break;
      case "Fuego":
      case "Hielo":
        dado = Math.floor(Math.random() * 8) + 1; // 1d8
        break;
      case "Veneno":
      case "Machete":
        dado = Math.floor(Math.random() * 10) + 1; // 1d10
        break;
      default:
        dado = Math.floor(Math.random() * 6) + 1; // Default to 1d6
    }

    return combatiente.attack + dado;
  };

  const calcularDaño = (tipoHeroe: string): number => {
    let dado: number;

    switch (tipoHeroe) {
      case "Tanque":
      case "Armas":
        dado = Math.floor(Math.random() * 4) + 1; // 1d4
        break;
      case "Fuego":
      case "Hielo":
        dado = Math.floor(Math.random() * 6) + 1; // 1d6
        break;
      case "Veneno":
      case "Machete":
        dado = Math.floor(Math.random() * 8) + 1; // 1d8
        break;
      default:
        dado = Math.floor(Math.random() * 4) + 1; // Default to 1d4
    }

    return dado;
  };

  const seleccionarEfecto = (tipoHeroe: string): { efecto: string, daño: string } => {
    const efectosDelHeroe = efectosHeroeData[tipoHeroe as keyof typeof efectosHeroeData] as EfectosHeroe;
    if (!efectosDelHeroe) return { efecto: "no causar daño", daño: "0%" };

    const filas: string[] = [];
    efectosDelHeroe.efectos.forEach((efecto, index) => {
      const cantidad = efectosDelHeroe.cantidad_filas[index];
      filas.push(...Array(cantidad).fill(efecto));
    });

    const efectoSeleccionado = filas[Math.floor(Math.random() * filas.length)];
    const indiceEfecto = efectosDelHeroe.efectos.indexOf(efectoSeleccionado);
    const efectoDaño = efectosDelHeroe.efectos_daño[indiceEfecto];

    return { efecto: efectoSeleccionado, daño: efectoDaño };
  };


  const calcularDañoFinal = (atacante: Combatiente, defensor: Combatiente, esAtaqueJugador: boolean) => {
    let ataqueTotal = calcularAtaque(atacante);
    const { efecto, daño } = seleccionarEfecto(atacante.type);
  
    // Aplicar efectos activos
    ataqueTotal += activeEffects.increaseAttack?.value || 0;
  
    let defensaTotal = defensor.defense + (activeEffects.increaseDefense?.value || 0);
  
    if (ataqueTotal <= defensaTotal) {
      return {
        dañoFinal: 0,
        efecto: "ataque fallido",
        ataqueExitoso: false
      };
    }
  
    let dañoBase = calcularDaño(atacante.type);
    let dañoFinal = dañoBase;
  
    // Aplicar efectos especiales solo si es el ataque del jugador
    if (esAtaqueJugador) {
      // Aplicar el efecto de "Flor de loto"
      if (specialEffects.florDeLoto) {
        const dañoAdicional = Math.floor(Math.random() * 5) + 4; // 4-8 daño adicional
        dañoFinal += dañoAdicional;
        console.log(`Daño adicional de Flor de loto: ${dañoAdicional}`);
        setSpecialEffects(prev => ({ ...prev, florDeLoto: undefined }));
      }

      if (specialEffects.agonia) {
        const dañoAdicional = Math.floor(Math.random() * 8) + 2; // 2-9 daño adicional
        dañoFinal += dañoAdicional;
        console.log(`Daño adicional de Agonía: ${dañoAdicional}`);
        setSpecialEffects(prev => ({ ...prev, agonia: undefined }));
      }

      if (specialEffects.machetazo) {
        const dañoAdicional = Math.floor(Math.random() * 7) + 2; // 2-8 daño adicional
        dañoFinal += dañoAdicional;
        console.log(`Daño adicional de Machetazo: ${dañoAdicional}`);
        setSpecialEffects(prev => ({ ...prev, machetazo: undefined }));
      }
  
      // Aplicar el efecto de "Cortada"
      if (activeEffects.cortada) {
        dañoFinal += activeEffects.cortada.value;
        console.log(`Daño adicional de Cortada: ${activeEffects.cortada.value}`);
      }
    }
  
    // Aplicar modificadores de daño basados en el efecto
    switch (efecto) {
      case "causar daño":
        dañoFinal = dañoFinal * parseFloat(daño) / 100;
        break;
      case "causar daño crítico": {
        const [minStr, maxStr] = daño.split("-");
        const min = parseFloat(minStr) / 100;
        const max = parseFloat(maxStr) / 100;
        dañoFinal = dañoFinal * (Math.random() * (max - min) + min);
        break;
      }
      case "evaden el golpe":
      case "escapan al golpe":
      case "resisten el golpe":
        dañoFinal = dañoFinal * parseFloat(daño) / 100;
        break;
      case "no causar daño":
        dañoFinal = 0;
        break;
    }
  
    console.log(`Daño base: ${dañoBase}, Daño final: ${dañoFinal}`);
    if (!esAtaqueJugador && defensor === jugador) {
      // Si es un ataque del enemigo al jugador, actualizamos la vida del jugador
      const nuevaVidaJugador = Math.max(0, defensor.health - dañoFinal);
      updatePlayerHealth(nuevaVidaJugador);
    }

    return {
      dañoFinal: Math.round(dañoFinal),
      efecto,
      ataqueExitoso: true
    };
  };
  

  const finalizarTurnoJugador = () => {
    setIsJugadorTurn(false);
    onTurnEnd();
    setSelectedAction(null);
    setActionPerformed(false);
    setShieldThrowUsed(false);
    setTimeout(() => {
      handleTurnoEnemigo();
    }, 1000);
  };

  const handleAtaque = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (jugador && enemigo && !gameOver && isOpponentSelected && isJugadorTurn) {
      onPlayerAttack();
      
      const { dañoFinal, efecto, ataqueExitoso } = calcularDañoFinal(jugador, enemigo, true);
    
      if (ataqueExitoso) {
        const nuevaVidaEnemigo = Math.max(0, enemigo.health - dañoFinal);
        setEnemigo(prevEnemigo => {
          if (prevEnemigo) {
            return { ...prevEnemigo, health: nuevaVidaEnemigo };
          }
          return prevEnemigo;
        });
        onActionMessage({
          message: `¡${jugador.name} ha atacado! Efecto: ${efecto}. Daño: ${dañoFinal}`,
          defenderType: null
        });
    
        if (nuevaVidaEnemigo === 0) {
          onActionMessage({
            message: "¡Has ganado la batalla!",
            defenderType: null
          });
          setGameOver(true);
          return;
        }
      } else {
        onActionMessage({
          message: `¡La defensa de ${enemigo.name} fue superior!`,
          defenderType: 'enemy'
        });
      }
    
      finalizarTurnoJugador();
    } else if (!isOpponentSelected) {
      onActionMessage({
        message: "¡Debes seleccionar un oponente primero!",
        defenderType: null
      });
    } 
  };



  const updatePlayerHealth = (newHealth: number) => {
    console.log(`Actualizando vida del jugador. Actual: ${jugador?.health}, Nueva: ${newHealth}`);
    setJugador(prevJugador => {
      if (prevJugador) {
        const updatedJugador = { ...prevJugador, health: newHealth };
        console.log('Jugador actualizado:', updatedJugador);
        return updatedJugador;
      }
      return prevJugador;
    });
    setJugadorVidaActual(newHealth);
  };

  // Modificar la función handleTurnoEnemigo
  const handleTurnoEnemigo = () => {
    if (enemigo && jugador && !gameOver) {
      onEnemyAttack();
      
      // Crear una copia del jugador con los efectos temporales aplicados
      const jugadorConEfectos = {
        ...jugador,
        attack: jugador.attack + (activeEffects.increaseAttack?.value || 0),
        defense: jugador.defense + (activeEffects.increaseDefense?.value || 0),
        damage: jugador.damage + (activeEffects.increaseDamage?.value || 0),
        // Añadir otros efectos relevantes aquí
      };
  
      console.log('Jugador con efectos aplicados:', jugadorConEfectos);
  
      const { dañoFinal, efecto, ataqueExitoso } = calcularDañoFinal(enemigo, jugadorConEfectos, false);
    
      if (ataqueExitoso) {
        const nuevaVidaJugador = Math.max(0, jugador.health - dañoFinal);
        
        console.log('Vida actual antes del ataque:', jugador.health);
        console.log('Daño calculado:', dañoFinal);
        console.log('Nueva vida calculada:', nuevaVidaJugador);
    
        updatePlayerHealth(nuevaVidaJugador);
    
        onActionMessage({
          message: `¡${enemigo.name} ha atacado! Efecto: ${efecto}. Daño: ${dañoFinal}`,
          defenderType: null
        });
    
        if (nuevaVidaJugador === 0) {
          onActionMessage({
            message: "¡Has perdido la batalla!",
            defenderType: null
          });
          setGameOver(true);
          return;
        }
      } else {
        onActionMessage({
          message: `¡La defensa de ${jugador.name} fue superior!`,
          defenderType: 'player'
        });
      }
      recuperarPuntosPoder();
      actualizarEfectosActivos();
  
      setTimeout(() => {
        iniciarTurnoJugador();
      }, 1000);
    }
  };

  



  


const recuperarPuntosPoder = () => {
  if (jugador) {
    // Incrementar los puntos de poder en 2, respetando el límite máximo
    setPowerPointsLeft(prev => {
      if (prev < jugador.powerPoints) {
        const nuevosPuntosPoder = Math.min(jugador.powerPoints, prev + 2);
        return nuevosPuntosPoder;
      }
      return prev;
    });
  }
};



  

const aplicarEfectos = (habilidad: Acciones): ActiveEffects => {
  if (habilidad.effects && jugador) {
    console.log(`Aplicando efectos de ${habilidad.name}:`, habilidad.effects);
    const newActiveEffects: ActiveEffects = { ...activeEffects };
    
    const newSpecialEffects: SpecialEffects = { ...specialEffects };
    
    Object.entries(habilidad.effects).forEach(([key, value]) => {
      if (habilidad.name === "Flor de loto" && key === "increaseDamage") {
        newSpecialEffects.florDeLoto = "active";
      } else if (habilidad.name === "Agonía" && key === "increaseDamage") {
        newSpecialEffects.agonia = "active";
      } else if (habilidad.name === "Cortada" && key === "increaseDamage") {
        if (typeof value === 'object' && 'amount' in value && 'duration' in value) {
          newActiveEffects[key] = { 
            value: typeof value.amount === 'number' ? value.amount : 0, 
            duration: typeof value.duration === 'number' ? value.duration : 1 
          };
        }
      } else if (habilidad.name === "Machetazo") {
        if (key === "increaseDamage" && typeof value === 'string') {
          newSpecialEffects.machetazo = value;
        } else if (key === "increaseAttack" && typeof value === 'number') {
          newActiveEffects[key] = { value: value, duration: 1 };
        }
      } else if (habilidad.name === "Mano de piedra" && key === "increaseDefense") {
        if (typeof value === 'number') {
          newActiveEffects[key] = { value, duration: 1 };
        } else if (typeof value === 'object' && 'amount' in value) {
          newActiveEffects[key] = { 
            value: typeof value.amount === 'number' ? value.amount : 0,
            duration: typeof value.duration === 'number' ? value.duration : 1
          };
        }
        console.log("Efecto Mano de piedra activado:", newActiveEffects[key]);
      } else if (typeof value === 'number') {
        newActiveEffects[key] = { value, duration: 1 };
      } else if (typeof value === 'object' && 'amount' in value && 'duration' in value) {
        newActiveEffects[key] = { 
          value: typeof value.amount === 'number' ? value.amount : 0, 
          duration: typeof value.duration === 'number' ? value.duration : 1 
        };
      } else if (typeof value === 'boolean') {
        newActiveEffects[key] = { value: value ? 1 : 0, duration: 1 };
      }
    });

    setActiveEffects(newActiveEffects);
    setSpecialEffects(newSpecialEffects);

    actualizarEstadisticasJugador(newActiveEffects);

    return newActiveEffects;
  }
  return {};
};


const actualizarEstadisticasJugador = (efectos: ActiveEffects) => {
  if (jugador) {
    const updatedJugador = {
      ...jugador,
      attack: equipmentEffects.attack,
      defense: equipmentEffects.defense,
      damage: equipmentEffects.damage,
    };

    Object.entries(efectos).forEach(([key, effect]) => {
      switch (key) {
        case 'increaseAttack':
          updatedJugador.attack += effect.value;
          break;
        case 'increaseDefense':
          updatedJugador.defense += effect.value;
          break;
        case 'increaseDamage':
          updatedJugador.damage += effect.value;
          break;
        // ... (otros casos según sea necesario)
      }
    });

    setJugador(updatedJugador);
    console.log("Estadísticas actualizadas del jugador:", updatedJugador);
  }
};


const actualizarEfectosActivos = () => {
  const newActiveEffects: ActiveEffects = {};
  let effectsChanged = false;

  Object.entries(activeEffects).forEach(([key, effect]) => {
    if (effect.duration > 1) {
      newActiveEffects[key] = { ...effect, duration: effect.duration - 1 };
    } else {
      effectsChanged = true;
    }
  });

  if (effectsChanged || Object.keys(newActiveEffects).length !== Object.keys(activeEffects).length) {
    setActiveEffects(newActiveEffects);
    actualizarEstadisticasJugador(newActiveEffects);
  }
  
  console.log("Efectos activos actualizados:", newActiveEffects);
};






const handleSkillSelect = (habilidad: Acciones) => {
  console.log("Habilidad seleccionada:", habilidad);
  console.log("Estadísticas del jugador antes de aplicar la habilidad:", jugador);

  if (jugador && habilitado && isOpponentSelected && !actionUsed) {
    if (powerPointsLeft >= habilidad.powerCost) {
      setSelectedAction(habilidad);
      setActionPerformed(true);
      const updatedPowerPointsLeft = powerPointsLeft - habilidad.powerCost;
      setPowerPointsLeft(updatedPowerPointsLeft);
      
      onActionMessage({
        message: `¡${jugador.name} ha utilizado ${habilidad.name}!`,
        defenderType: null
      });

      // Aplicar efectos de la habilidad
      const efectosAplicados = aplicarEfectos(habilidad);

      console.log("Estadísticas del jugador después de aplicar la habilidad:", jugador);
      console.log("Efectos aplicados:", efectosAplicados);

      // Manejar efectos específicos de ciertas habilidades
      switch (habilidad.name) {
        case "Flor de loto":
          onActionMessage({
            message: "¡Flor de loto activada! Tu próximo ataque causará daño adicional.",
            defenderType: null
          });
          break;
        case "Agonía":
          onActionMessage({
            message: "¡Agonía activada! Tu próximo ataque causará daño adicional",
            defenderType: null
          });
          break;
        case "Mano de piedra":
          onActionMessage({
            message: "¡Mano de piedra activada! Tu defensa ha aumentado considerablemente.",
            defenderType: null
          });
          break;
        // ... (otros casos específicos)
      }

      // Lista de habilidades que permiten un ataque adicional
      const habilidadesConAtaqueAdicional = [
        "Shield Throw", "Embate sangriento", "Lanza de los dioses",
        "Misiles de magma", "Lluvia de hielo", "Flor de loto", "Cortada", "Agonía", "Machetazo",
        "Mano de piedra", "Defensa feroz", "Vulcano", "Golpe de tormenta", "Pared de fuego", "Cono de hielo"
      ];

      if (habilidadesConAtaqueAdicional.includes(habilidad.name)) {
        if (habilidad.name === "Shield Throw") {
          setShieldThrowUsed(true);
        }
        onActionMessage({
          message: `¡${habilidad.name} activado! Ahora puedes atacar con el efecto aplicado.`,
          defenderType: null
        });
      } else {
        finalizarTurnoJugador();
      }

      if (updatedPowerPointsLeft <= 0) {
        onActionMessage({
          message: "¡Ya no te quedan puntos de poder!",
          defenderType: null
        });
      }
    } else {
      onActionMessage({
        message: "¡No tienes suficientes puntos de poder!",
        defenderType: null
      });
    }
  } else if (!isOpponentSelected) {
    onActionMessage({
      message: "¡Debes seleccionar un oponente primero!",
      defenderType: null
    });
  } else if (selectedAction || actionPerformed) {
    onActionMessage({
      message: "Ya has seleccionado una acción este turno.",
      defenderType: null
    });
  }
};



const iniciarTurnoJugador = () => {
  // Resetear efectos al inicio del turno del jugador
  setActiveEffects({});
  if (originalStats) {
    const updatedJugador = {
      ...jugador!,
      attack: originalStats.attack,
      defense: originalStats.defense,
    };
    setJugador(updatedJugador);
  }
  actualizarEfectosActivos(); // Asegurarse de que los efectos se actualicen al inicio del turno del jugador
  setIsJugadorTurn(true);
  setSelectedAction(null);
  setActionPerformed(false);
  setShieldThrowUsed(false);
  setTimeLeft(TURN_TIME);
  setTurnEnded(false);


};

// Añade este efecto para monitorear los cambios en la vida del jugador
useEffect(() => {
  console.log('Vida del jugador (desde useEffect):', jugador?.health);
}, [jugador?.health]);



  

  const getBarraVidaStyle = (health: number, maxHealth: number) => {
    if (maxHealth === 0) return {}; // Evita división por cero
    
    const porcentajeVida = (health / maxHealth) * 100;
    if (porcentajeVida < 40) {
      return { backgroundColor: 'red' };
    } else if (porcentajeVida <= 60) {
      return { backgroundColor: 'yellow' };
    }
    return { backgroundColor: "var(--color-mediumseagreen-100)" };
  };

  const getActionImage = (actionName: string) => {
    switch (actionName) {
      case "Shield Throw":

        return "AccionPlus.png";
      case "Mano de piedra":
        return "Escudo.png";
      case "Misiles de magma":
      return "AccionMago1.png";  
      case "Pared de fuego":
      return "AccionMago2.png";
      case "Flor de loto":
      return "AccionVeneno1.png";
      case "Agonía":
      return "AccionVeneno2.png";
      case "Cortada":
      return "AccionMachete1.png";
      case "Machetazo":
      return "AccionMachete2.png";
      case "Embate sangriento":
      return "AccionArmas1.png";
      case "Lanza de los dioses":
      return "AccionArmas2.png";
      case "Lluvia de hielo":
      return "AccionHielo1.png";
      case "Bola de hielo":
      return "AccionHielo2.png";

      default:
        return "/Images/AccionPlus.png"; // You might want to add a default image
    }
  };

  const getJugadorVidaActual = (): number => {
    return jugadorVidaActual !== null ? jugadorVidaActual : (jugador?.health || 0);
  };
  
  const handleSurrender = () => {
    if (jugador) {
      // Actualizar el estado del jugador con salud a 0
      setJugador(prevJugador => {
        if (prevJugador) {
          return { ...prevJugador, health: 0 };
        }
        return prevJugador;
      });
  
      // Actualizar también baseStats con salud a 0
      setBaseStats(prevBaseStats => ({
        ...prevBaseStats,
        health: 0
      }));
  
      // Marcar el juego como terminado y enviar el mensaje de rendición
      setGameOver(true);
      onActionMessage({
        message: "¡Te has rendido! La batalla ha terminado.",
        defenderType: null
      });
    }
  };

  const handleExitGame = () => {
    navigate('/crearpartida');
  };
  
  
  

  // Obtener las recompensas del primer objeto de batallaData
  //const rewards = batallaData.length > 0 ? batallaData[0].rewards : { experience: 0, gold: 0 };

  return (
    <footer className={styles.playerContainer}>
      {!gameOver && (
        <button
          className={styles.surrenderButton}
          onClick={handleSurrender}
        >
          Rendirse
        </button>
      )}
      
      {gameOver && (
        <button
          className={styles.exitButton}
          onClick={onExitGame}
        >
          Salir
        </button>
      )}

      <div className={styles.timerContainer}>
        <div className={styles.timerCircle}>
          <div className={styles.timerContent}>
            <span className={styles.timerNumber}>{timeLeft}</span>
            <span className={styles.timerText}>segundos</span>
          </div>
        </div>
      </div>

      <div className={styles.barradeaccion} />

      <div className={styles.playerInfo}>
        <div className={styles.playerName}>
          <div className={styles.playerNameDisplay}>
            <div className={styles.barraestaticadevida} />
            <button 
              className={styles.barradinamicadevidajugadorParent}
              style={jugador ? getBarraVidaStyle(getJugadorVidaActual(), jugador.maxHealth) : {}}
            >
              <div className={styles.barradinamicadevidajugador} />
              <b className={styles.porcentajevidajugador}>
                {jugador ? `${Math.round((jugador.health / jugador.maxHealth) * 100)}%` : 'Cargando...'}
              </b>
            </button>
          </div>
          <div className={styles.nombrejugadorWrapper}>
            <b className={styles.nombrejugador}>
              {jugador ? `${jugador.name} lvl. ${jugador.level}` : 'Cargando...'}
            </b>
          </div>
        </div>
        <div className={styles.enemyInfo}>
          <div className={styles.enemyName}>
            <b className={styles.nombreenemigo}>
              {enemigo ? `${enemigo.name} lvl. ${enemigo.level}` : 'Cargando...'}
            </b>
          </div>
          <div className={styles.enemyHealth}>
            <div className={styles.barraestaticadevida1} />
            <button 
              className={styles.enemyHealthDisplay}
              style={enemigo ? getBarraVidaStyle(enemigo.health, enemigo.maxHealth) : {}}
            >
              <div className={styles.barradinamicadevidaenemigo} />
              <b className={styles.porcentajevidaenemigo}>
                {enemigo ? `${Math.round((enemigo.health / enemigo.maxHealth) * 100)}%` : 'Cargando...'}
              </b>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.gameActions}>
        <div className={styles.turnActions}>
          {!gameOver && (
            <div className={styles.turnIndicator}>
              <h3 className={styles.indicadordeturno}>
                {isJugadorTurn ? "¡Es tu turno!" : "¡Turno del enemigo!"}
              </h3>
            </div>
          )}
          {gameOver && (<br />)}

          <div className={styles.actionButtons}>
            <div className={styles.attackSkillButtons}>
              <button
                className={styles.botonatacar}
                onClick={(e) => handleAtaque(e)}
                disabled={!isJugadorTurn || !isOpponentSelected || turnEnded}
              >
                <img src="/Images/Ataque.png" alt="Atacar" className={styles.attackButtonImage} />
              </button>
            </div>
            <div className={styles.attackSkillButtons1}>
              <div className={styles.botonhabilidadesParent}>
                {habilidades.map((habilidad) => (
                  <button
                    key={habilidad._id}
                    className={styles.botonaccion}
                    onClick={() => handleSkillSelect(habilidad)}
                    disabled={!isJugadorTurn || selectedAction !== null || actionPerformed || !isOpponentSelected || gameOver || powerPointsLeft < habilidad.powerCost}
                    >
                    <img 
                      src={`/Images/${getActionImage(habilidad.name)}`} 
                      alt={habilidad.name} 
                      className={styles.actionButtonImage} 
                    />

                  </button>
                ))}
              </div>
            </div>
            <div className={styles.powerPoints}>
              {jugador && (
                <b className={styles.cantidadpuntospoder}>
                  {powerPointsLeft} / {jugador.powerPoints} Puntos de Poder
                </b>
              )}
            </div>
          </div>
          {showSkills && (
            <div className={styles.skillsList} style={{ maxHeight: "114px", overflowY: "auto" }}>
              <ul style={{ fontSize: "16px" }}>
                {habilidades.map((habilidad) => (
                  <li
                    key={habilidad._id}
                    onClick={() => handleSkillSelect(habilidad)}
                    style={{ fontSize: "16px" }}
                  >
                    {habilidad.name} ({habilidad.powerCost} PP)
                  </li>
                ))}
              </ul>
            </div>
          )}
          {gameOver && (
            <div className={styles.gameOverMessage}>
              {jugador?.health === 0 ? "¡Has perdido la batalla!" : "¡Has ganado la batalla!"}
            </div>
            
      
          )}

            {gameOver && (jugador?.health !== 0 || enemigo?.health==0) && showVictoryPanel && (
              <VictoryPanel 
                creditsWon={creditsWon} 
                onClose={closeVictoryPanel} 
              />
            )}
        </div>
      </div>
    </footer>
  );
};
export default PlayerContainer;
