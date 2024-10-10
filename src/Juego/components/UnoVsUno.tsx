import React, { FunctionComponent, useState, useEffect } from "react";
import PlayerContainer from "../components/PlayerContainer";
import { useLocation } from 'react-router-dom';
import StatBox from "../components/StatBox";
import styles from "../styles/UnoVsUno.module.css";
import Combatiente from "../interfaces/Combatiente";
import botData from '../data/bot.json';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../hooks/useAuth";
import Environment from "../../shared/Environment";

type ActionMessageType = {
  message: string;
  defenderType: 'player' | 'enemy' | null;
};

interface UnoVsUnoProps {
  jugador: Combatiente;
  selectedHeroId: string;
}

const UnoVsUno: FunctionComponent<UnoVsUnoProps> = ({ jugador: jugadorInicial, selectedHeroId }) => {


  const user = useAuth(s => s.user);


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
  const [showRewardPanel, setShowRewardPanel] = useState(false);
  const [playerCredits, setPlayerCredits] = useState(0);

  
  


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

  const handleGameOver = (playerWon: boolean) => {
    if (playerWon) {
      setShowRewardPanel(true);
    } else {
      // Manejar el caso de derrota si es necesario
    }
  };

  const handleCollectReward = () => {
    const creditsEarned = 2;
    const newTotalCredits = playerCredits + creditsEarned;
    setPlayerCredits(newTotalCredits);    
    console.log("2 créditos añadidos al jugador");
    setShowRewardPanel(false);
    if(user){
      setCreditsUser(user?.iduser, (user?.credits+creditsEarned))
    }
    handleExitGame();
  };

  
  async function setCreditsUser(idUser:number, credits:number){
    // Realizar una solicitud GET con Axios
    try {
      console.log(idUser, credits)
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

  const RewardPanel = () => (
    <div className={styles.rewardPanelOverlay}>
      <div className={styles.rewardPanel}>
        <h2 className={styles.rewardTitle}>¡Victoria!</h2>
        <div className={styles.rewardContent}>
          <p className={styles.rewardText}>Has ganado la batalla</p>
          <div className={styles.rewardItem}>
            <span className={styles.creditAmount}>+2 Créditos</span>
          </div>
        </div>
        <button className={styles.collectButton} onClick={handleCollectReward}>
          Recoger Recompensa
        </button>
      </div>
    </div>
  );

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
                className={`${styles.jugadorIcon} 
                  ${isPlayerAttacking ? styles.jugadorIconAttack : ""}
                  ${updatedJugador.type === 'Fuego' || updatedJugador.type === 'Hielo' ? styles.magoImage : ''}
                  ${updatedJugador.health <= 0 ? styles.derrotado1 : ''}`}
                alt="Jugador"
                src={`/Images/${updatedJugador.image}`}
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
                className={`${styles.enemigoIcon} 
                  ${isEnemyAttacking ? styles.enemigoIconAttack : ""}
                  ${enemigo && enemigo.health <= 0 ? styles.derrotado2 : ''}`}
                alt="Enemigo"
                src={`/Images/${enemigo?.image}` || "./Juego/assets/BarbaroTanque.png"}
              />
              {isEnemyShielding && (
                <div className={styles.shieldEffect}>🛡️</div>
              )}
                        {showRewardPanel && <RewardPanel />}

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
          onGameOver={handleGameOver}


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
