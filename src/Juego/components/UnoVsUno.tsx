import React, { FunctionComponent, useState, useEffect } from "react";
import PlayerContainer from "../components/PlayerContainer";
import { useLocation } from 'react-router-dom';
import StatBox from "../components/StatBox";
import styles from "../styles/UnoVsUno.module.css";
import Combatiente from "../interfaces/Combatiente";
import botData from '../data/bot.json';
import { useNavigate } from 'react-router-dom';


// Estoy cansado Jefe

type ActionMessageType = {
  message: string;
  defenderType: 'player' | 'enemy' | null;
};

interface UnoVsUnoProps {
  jugador: Combatiente;
  selectedHeroId: string;
}

const UnoVsUno: FunctionComponent<UnoVsUnoProps> = ({ jugador: jugadorInicial, selectedHeroId }) => {
  const location = useLocation();
  const [updatedJugador, setUpdatedJugador] = useState<Combatiente | null>(jugadorInicial);
  const [enemigo, setEnemigo] = useState<Combatiente | null>(null);
  const [isOpponentSelected, setIsOpponentSelected] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [isPlayerShielding, setIsPlayerShielding] = useState(false);
  const [isEnemyShielding, setIsEnemyShielding] = useState(false);
  const navigate = useNavigate();
  
  


  useEffect(() => {
    const heroWithEquipment = location.state?.hero as Combatiente | undefined;
    
    if (heroWithEquipment) {
      let newAttack = heroWithEquipment.attack;
      let newDefense = heroWithEquipment.defense;
      let newHealth = heroWithEquipment.health;
      
      Object.values(heroWithEquipment.equippedItems).forEach(item => {
        if (item) {
          newAttack += item.effects.attack || 0;
          newDefense += item.effects.defense || 0;
          newHealth += item.effects.health || 0;
        }
      });
      
      setUpdatedJugador({
        ...heroWithEquipment,
        attack: newAttack,
        defense: newDefense,
        health: newHealth,
        maxHealth: newHealth
      });
    }
  }, [location.state]);

  useEffect(() => {
    // Seleccionar un enemigo aleatorio de botData
    const randomEnemyIndex = Math.floor(Math.random() * botData.length);
    setEnemigo(botData[randomEnemyIndex]);
  }, []);

  const handleActionMessage = ({ message, defenderType }: ActionMessageType) => {
    setActionMessage(message);
    
    setIsPlayerShielding(defenderType === 'player');
    setIsEnemyShielding(defenderType === 'enemy');

    setTimeout(() => {
      setActionMessage(null);
      setIsPlayerShielding(false);
      setIsEnemyShielding(false);
    }, 2000);
  };

  

  const handlePlayerAttack = () => {
    setIsPlayerAttacking(true);
    setTimeout(() => {
      setIsPlayerAttacking(false);
    }, 500);
  };

  const handleEnemyAttack = () => {
    setIsEnemyAttacking(true);
    setTimeout(() => {
      setIsEnemyAttacking(false);
    }, 500);
  };

  const handleOpponentSelection = () => {
    setIsOpponentSelected(!isOpponentSelected);
  };

  const handleTurnEnd = () => {
    setIsOpponentSelected(false);
  };

  const handleExitGame = () => {
    // Realiza cualquier limpieza necesaria aquí
    navigate('/crearpartida');
  };

  

  if (!updatedJugador) return null;

  return (
    <div className={styles.unovsuno}>
      <div className={styles.gameContent}>
        
        <section className={styles.enemyContainer}>
          <div className={styles.jugadorParent}>
            <div className={styles.characterContainer}>
              <StatBox      
                attack={updatedJugador.attack}
                defense={updatedJugador.defense}
                health={updatedJugador.health}
                maxHealth={updatedJugador.maxHealth}
              />
              <img
                className={`${styles.jugadorIcon} ${
                  isPlayerAttacking ? styles.jugadorIconAttack : ""
                } ${updatedJugador.type === 'Fuego' || updatedJugador.type === 'Hielo' ? styles.magoImage : ''}`}
                alt="Jugador"
                src={updatedJugador.image}
              />
              {isPlayerShielding && (
                <div className={styles.shieldEffect}>🛡️</div>
              )}
            </div>
            <div 
              className={`${styles.characterContainer} ${isOpponentSelected ? styles.selectedOpponent : ''}`}
              onClick={handleOpponentSelection}
            >
              {enemigo && <StatBox 
                attack={enemigo.attack}
                defense={enemigo.defense}
                health={enemigo.health}
                maxHealth={enemigo.maxHealth}
              />}
              <img
                className={`${styles.enemigoIcon} ${
                  isEnemyAttacking ? styles.enemigoIconAttack : ""
                }`}
                alt="Enemigo"
                src={enemigo?.image || "src/assets/BarbaroTanque.png"}
              />
              {isEnemyShielding && (
                <div className={styles.shieldEffect}>🛡️</div>
              )}
            </div>
          </div>
        </section>
  
        <PlayerContainer
          onActionMessage={handleActionMessage}
          onPlayerAttack={handlePlayerAttack}
          onEnemyAttack={handleEnemyAttack}
          jugador={updatedJugador}
          enemigo={enemigo}
          setJugador={setUpdatedJugador}
          setEnemigo={setEnemigo}
          isOpponentSelected={isOpponentSelected}
          onTurnEnd={handleTurnEnd}
          selectedHeroId={selectedHeroId}
          onExitGame={handleExitGame} // Pass the new function as a prop

        />
  
        {actionMessage && (
          <div className={styles.actionMessage}>
            <h2>{actionMessage}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnoVsUno;
