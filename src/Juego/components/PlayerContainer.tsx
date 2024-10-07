import { FunctionComponent, Dispatch, SetStateAction, useState, useEffect, MouseEvent, useRef    } from "react";
import styles from "../styles/PlayerContainer.module.css";
import { Acciones } from "../interfaces/Acciones";
import Combatiente from "../interfaces/Combatiente";
//import batallaData from '../data/batalla.json';
import combatienteData from '../data/combatiente.json';
import accionesData from '../data/acciones.json';
import efectosHeroeData from '../data/Efectosheroe.json'
import EfectosHeroe from "../interfaces/EfectosHeroe";
import { useNavigate } from 'react-router-dom';

interface ActiveEffect {
  value: number;
  duration: number;
}

interface ActiveEffects {
  [key: string]: ActiveEffect;
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
  const [baseStats, setBaseStats] = useState({
    attack: jugador?.baseAttack || jugador?.attack || 0, 
    defense: jugador?.baseDefense || jugador?.defense || 0, 
    health: jugador?.baseHealth || jugador?.health || 100, // Cambia 100 por un valor predeterminado razonable
    maxHealth: jugador?.baseMaxHealth || jugador?.maxHealth || 100, // Cambia 100 por un valor predeterminado
  });
  
  



  
  const getSelectedHeroId = () => {
    return selectedHeroId;
  };
  
  const [equippedItems, setEquippedItems] = useState<Combatiente['equippedItems']>({
    armor1: null,
    armor2: null,
    weapon: null,
    item: null,
  });
  
  
  console.log("jugadorContainer renderizando. selectedHeroId:", selectedHeroId);
  
  const initializePlayerStats = (jugador: Combatiente) => {
    console.log("Inicializando estadísticas del jugador");
    const newBaseStats = {
      attack: jugador.baseAttack || jugador.attack,
      defense: jugador.baseDefense || jugador.defense,
      health: jugador.baseHealth || jugador.health,
      maxHealth: jugador.baseMaxHealth || jugador.maxHealth
    };
    console.log("Nuevas estadísticas base:", newBaseStats);

    setBaseStats(newBaseStats);
    setJugadorVidaActual(newBaseStats.health);

    const updatedPlayer = applyEquipmentEffects(jugador, newBaseStats);
    console.log("Jugador actualizado:", updatedPlayer);

    setJugador(updatedPlayer);
    setPowerPointsLeft(updatedPlayer.powerPoints);
    setEquippedItems(updatedPlayer.equippedItems);
    setOriginalStats({
      attack: updatedPlayer.attack,
      defense: updatedPlayer.defense,
      damage: updatedPlayer.damage || 0,
    });
  };
  
  useEffect(() => {
    if (jugador) {
      console.log("Jugador inicial:", jugador);

      const base = {
        attack: jugador.baseAttack || jugador.attack,
        defense: jugador.baseDefense || jugador.defense,
        health: jugador.baseHealth || jugador.health,
        maxHealth: jugador.baseMaxHealth || jugador.maxHealth
      };
      setBaseStats(base);
      console.log("Estadísticas base establecidas:", base);
      initializePlayerStats(jugador);

      const updatedJugador = applyEquipmentEffects(jugador, base);
      setJugador(updatedJugador);
      setPowerPointsLeft(updatedJugador.powerPointsLeft);
      setEquippedItems(updatedJugador.equippedItems);
      setOriginalStats({ 
        attack: updatedJugador.attack, 
        defense: updatedJugador.defense, 
        damage: updatedJugador.damage || 0, 
      });
  
      console.log("Jugador actualizado con efectos de equipamiento:", updatedJugador);
  
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
  }, [jugador]);
  
  const applyEquipmentEffects = (hero: Combatiente, baseStats: { attack: number; defense: number; health: number; maxHealth: number }): Combatiente => {
    let updatedHero = { 
      ...hero,
      attack: baseStats.attack,
      defense: baseStats.defense,
      health: baseStats.health,
      maxHealth: baseStats.maxHealth
    };
    let additionalHealth = 0;
  
    console.log("Aplicando efectos de equipamiento. Vida base:", updatedHero.health);
  
    // Aplicar efectos de los ítems equipados
    Object.values(hero.equippedItems).forEach(item => {
      if (item) {
        updatedHero.attack += item.effects.attack || 0;
        updatedHero.defense += item.effects.defense || 0;
        additionalHealth += item.effects.health || 0;
        console.log(`Efecto de ítem equipado: +${item.effects.health || 0} salud`);
      }
    });
  
    // Aplicar efectos de los ítems en la bolsa
    hero.bagItems.forEach(item => {
      updatedHero.attack += item.effects.attack || 0;
      updatedHero.defense += item.effects.defense || 0;
      additionalHealth += item.effects.health || 0;
      console.log(`Efecto de ítem en bolsa: +${item.effects.health || 0} salud`);
    });
  
    updatedHero.maxHealth += additionalHealth;
    updatedHero.health += additionalHealth;
  
    console.log(`Salud adicional de ítems: ${additionalHealth}`);
    console.log(`Salud final: ${updatedHero.health}/${updatedHero.maxHealth}`);
  
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
      setGameOver(true);
    }
  }, [jugador?.health, enemigo?.health, gameOver]);


 

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


  const calcularDañoFinal = (atacante: Combatiente, defensor: Combatiente) => {
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

    const dañoBase = calcularDaño(atacante.type);
    let dañoFinal = 0;

    switch (efecto) {
      case "causar daño":
        dañoFinal = dañoBase * parseFloat(daño) / 100;
        break;
      case "causar daño crítico": {
        const [minStr, maxStr] = daño.split("-");
        const min = parseFloat(minStr) / 100;
        const max = parseFloat(maxStr) / 100;
        dañoFinal = dañoBase * (Math.random() * (max - min) + min);
        break;
      }
      case "evaden el golpe":
      case "escapan al golpe":
      case "resisten el golpe":
        dañoFinal = dañoBase * parseFloat(daño) / 100;
        break;
      case "no causar daño":
        dañoFinal = 0;
        break;
      default:
        dañoFinal = dañoBase;
    }

    // Aplicar efectos adicionales al daño
    if (activeEffects.increaseDamage) {
      dañoFinal += activeEffects.increaseDamage.value;
    }

    return {
      dañoFinal: Math.round(dañoFinal),
      efecto,
      ataqueExitoso: true
    };
  };
  const finalizarTurnoJugador = () => {
    const updatedActiveEffects: ActiveEffects = {};
    Object.entries(activeEffects).forEach(([key, effect]) => {
      if (effect.duration > 1) {
        updatedActiveEffects[key] = { ...effect, duration: effect.duration - 1 };
      }
    });
    setActiveEffects(updatedActiveEffects);

    setIsJugadorTurn(false);
    onTurnEnd();
    setActionUsed(false);
    setShieldThrowUsed(false);
    setTimeout(() => {
      handleTurnoEnemigo();
    }, 1000);
  };

  const handleAtaque = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (jugador && enemigo && !gameOver && isOpponentSelected && (!actionUsed || shieldThrowUsed)) {
      setActionUsed(true);
      onPlayerAttack();
      
      const { dañoFinal, efecto, ataqueExitoso } = calcularDañoFinal(jugador, enemigo);
  
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
    } else if (actionUsed && !shieldThrowUsed) {
      onActionMessage({
        message: "Ya has realizado una acción este turno.",
        defenderType: null
      });
    }
  };


  const handleTurnoEnemigo = () => {
    if (enemigo && jugador && jugadorVidaActual !== null && !gameOver) {
      onEnemyAttack();
      const { dañoFinal, efecto, ataqueExitoso } = calcularDañoFinal(enemigo, jugador);

      if (ataqueExitoso) {
        const nuevaVidaJugador = Math.max(0, jugadorVidaActual - dañoFinal);
        
        setJugadorVidaActual(nuevaVidaJugador);
        setJugador(prevJugador => {
          if (prevJugador) {
            console.log(`Vida del jugador actualizada: ${nuevaVidaJugador}`);
            return { ...prevJugador, health: nuevaVidaJugador };
          }
          return prevJugador;
        });

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
      setTimeout(() => {
        iniciarTurnoJugador();
      }, 1000);
    }
  };


  const resetearEfectos = () => {
    if (jugador && originalStats && jugadorVidaActual !== null) {
      const updatedJugador = {
        ...jugador,
        attack: originalStats.attack,
        defense: originalStats.defense,
        health: jugadorVidaActual
      };
      
      setJugador(updatedJugador);
      setCurrentEffects({});
      setEfectosTemporales({});
      updateHeroStats();
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



  

const aplicarEfectos = (habilidad: Acciones) => {
  if (habilidad.effects && jugador) {
    console.log(`Aplicando efectos de ${habilidad.name}:`, habilidad.effects);
    const newActiveEffects: ActiveEffects = { ...activeEffects };
    
    Object.entries(habilidad.effects).forEach(([key, value]) => {
      if (typeof value === 'number') {
        newActiveEffects[key] = { value, duration: 2 };
      } else if (typeof value === 'object' && 'amount' in value) {
        const amount = typeof value.amount === 'string' ? parseInt(value.amount) : value.amount;
        newActiveEffects[key] = { 
          value: amount || 0, 
          duration: value.duration || 2 
        };
      }
      console.log(`Efecto ${key} aplicado:`, newActiveEffects[key]);
    });

    setActiveEffects(newActiveEffects);

    // Aplicar inmediatamente el efecto a las estadísticas del jugador
    const updatedJugador = { ...jugador };
    if (newActiveEffects.increaseAttack) {
      updatedJugador.attack += newActiveEffects.increaseAttack.value;
      console.log(`Ataque aumentado en ${newActiveEffects.increaseAttack.value}. Nuevo ataque: ${updatedJugador.attack}`);
    }
    if (newActiveEffects.increaseDefense) {
      updatedJugador.defense += newActiveEffects.increaseDefense.value;
      console.log(`Defensa aumentada en ${newActiveEffects.increaseDefense.value}. Nueva defensa: ${updatedJugador.defense}`);
    }
    if (newActiveEffects.increaseDamage) {
      updatedJugador.damage += newActiveEffects.increaseDamage.value;
      console.log(`Daño aumentado en ${newActiveEffects.increaseDamage.value}. Nuevo daño: ${updatedJugador.damage}`);
    }
    setJugador(updatedJugador);
    console.log("Estadísticas del jugador actualizadas:", updatedJugador);
  }
};

const handleSkillSelect = (habilidad: Acciones) => {
  console.log("Habilidad seleccionada:", habilidad);
  console.log("Estadísticas del jugador antes de aplicar la habilidad:", jugador);

  if (jugador && habilitado && isOpponentSelected && !actionUsed) {
    if (powerPointsLeft >= habilidad.powerCost) {
      const updatedPowerPointsLeft = powerPointsLeft - habilidad.powerCost;
      setPowerPointsLeft(updatedPowerPointsLeft);
      
      onActionMessage({
        message: `¡${jugador.name} ha utilizado ${habilidad.name}!`,
        defenderType: null
      });

      aplicarEfectos(habilidad);

      console.log("Estadísticas del jugador después de aplicar la habilidad:", jugador);

      if (habilidad.name === "Shield Throw" || habilidad.name === "Embate sangriento" || habilidad.name === "Lanza de los dioses") {
        if (habilidad.name === "Shield Throw") {
          setShieldThrowUsed(true);
        } else {
          // Para Embate sangriento y Lanza de los dioses
          console.log(`Aplicando ${habilidad.name}. Ataque antes:`, jugador.attack, "Daño antes:", jugador.damage);
        }
        onActionMessage({
          message: `¡${habilidad.name} activado! Ahora puedes atacar con el efecto aplicado.`,
          defenderType: null
        });
      } else {
        setActionUsed(true);
        finalizarTurnoJugador();
      }

      if (habilidad.name === "Mano de piedra") {
        console.log("Aplicando Mano de piedra. Defensa antes:", jugador.defense);
        aplicarEfectos(habilidad);
        console.log("Mano de piedra aplicada. Defensa después:", jugador.defense);
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
  } else if (actionUsed) {
    onActionMessage({
      message: "Ya has realizado una acción este turno.",
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

  setIsJugadorTurn(true);
  setHabilitado(true);
  setActionUsed(false);
  setShieldThrowUsed(false);
  setTimeLeft(TURN_TIME);
  setTurnEnded(false);

  if (jugadorVidaActual !== null) {
    setJugador(prevJugador => {
      if (prevJugador) {
        return { ...prevJugador, health: jugadorVidaActual };
      }
      return prevJugador;
    });
  }
};



  

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
        return "src/assets/AccionPlus.png";
      case "Mano de piedra":
        return "src/assets/Escudo.png";
      default:
        return "src/assets/default-action.png"; // You might want to add a default image
    }
  };

  const getJugadorVidaActual = (): number => {
    return jugadorVidaActual !== null ? jugadorVidaActual : baseStats.health;
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
          onClick={onExitGame} // Use the new prop here
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
        <button className={styles.barradinamicadevidajugadorParent}                
                style={jugador ? getBarraVidaStyle(getJugadorVidaActual(), jugador.maxHealth) : {}}

        >
          <div
            className={styles.barradinamicadevidajugador}
          />
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
              <button className={styles.enemyHealthDisplay}
              style={enemigo ? getBarraVidaStyle(enemigo.health, enemigo.maxHealth) : {}}
>
                <div
                  className={styles.barradinamicadevidaenemigo}
                />
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
                  <img src="src/assets/ataque.png" alt="Atacar" className={styles.attackButtonImage} />
                </button>
              </div>
              <div className={styles.attackSkillButtons1}>
                <div className={styles.botonhabilidadesParent}>
                {habilidades.map((habilidad) => (
                  <button
                  key={habilidad._id}
                  className={styles.botonaccion}
                  onClick={() => handleSkillSelect(habilidad)}
                  disabled={!isJugadorTurn || !isOpponentSelected || powerPointsLeft < habilidad.powerCost || actionUsed || shieldThrowUsed}
                  >
                  <img 
                    src={getActionImage(habilidad.name)} 
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

        </div>
    </div>
      
    </footer>
  );
};

export default PlayerContainer;
