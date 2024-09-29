import  { FunctionComponent, useState, useEffect } from "react";
import PlayerContainer from "../components/PlayerContainer";
import StatBox from "../components/StatBox";
import styles from "../styles/UnoVsUno.module.css";
import "../styles/UnoVsUno.module.css";
import Combatiente from "../interfaces/Combatiente";
import combatienteData from '../data/combatiente.json';

type ActionMessageType = {
  message: string;
  defenderType: 'player' | 'enemy' | null;
};

const UnoVsUno: FunctionComponent = () => {
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
  const [isPlayerShielding, setIsPlayerShielding] = useState(false);
  const [isEnemyShielding, setIsEnemyShielding] = useState(false);
  const [jugador, setJugador] = useState<Combatiente | null>(null);
  const [enemigo, setEnemigo] = useState<Combatiente | null>(null);
  const [isOpponentSelected, setIsOpponentSelected] = useState(false);

  useEffect(() => {
    const jugadorData = combatienteData.find(c => c._id === "64d3402d681948532712a45b") || null;
    const enemigoData = combatienteData.find(c => c._id === "64d3402d681948532712a45z") || null;

    if (jugadorData) setJugador(jugadorData);
    if (enemigoData) setEnemigo(enemigoData);
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

  return (
    <div className={styles.unovsuno}>
      <section className={styles.enemyContainer}>
        <div className={styles.jugadorParent}>
          <div className={styles.characterContainer}>
            {jugador && <StatBox      
              attack={jugador.attack}
              defense={jugador.defense}
              health={jugador.health}
              maxHealth={jugador.maxHealth}
            />}
            <img
              className={`${styles.jugadorIcon} ${
                isPlayerAttacking ? styles.jugadorIconAttack : ""
              }`}
              loading="lazy"
              alt=""
              src="src/Juego/assets/jugador.png"
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
              loading="lazy"
              alt=""
              src="src/Juego/assets/jugador.png"
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
        jugador={jugador}
        enemigo={enemigo}
        setJugador={setJugador}
        setEnemigo={setEnemigo}
        isOpponentSelected={isOpponentSelected}
        onTurnEnd={handleTurnEnd}

      />

      {actionMessage && (
        <div className={styles.actionMessage}>
          <h2>{actionMessage}</h2>
        </div>
      )}
    </div>
  );
};

export default UnoVsUno;