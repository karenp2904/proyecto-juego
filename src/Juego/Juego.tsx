import React, { useState } from 'react';
import GameManager from './components/GameManager';
import UnoVsUno from './components/UnoVsUno';

import styles from './styles/App.module.css';
import Combatiente from './interfaces/Combatiente';

const Juego: React.FC = () => {
  const [gameState, setGameState] = useState<'lobby' | 'playing'>('lobby');
  const [selectedHero, setSelectedHero] = useState<Combatiente | null>(null);
  const [selectedHeroId, setSelectedHeroId] = useState<string>('');

  const handleStartGame = (hero: Combatiente) => {
    setSelectedHero(hero);
    setSelectedHeroId(hero._id);
    setGameState('playing');
  };

  const handleHeroSelect = (heroId: string) => {
    setSelectedHeroId(heroId);
  };

  return (
          gameState === 'lobby' ? (
            <div className={styles.appContainer}>
              <div className={styles.lobbyBackground}>
                <GameManager 
                  onStartGame={handleStartGame}
                  onHeroSelect={handleHeroSelect}
                />
              </div>
            </div>
          ) : (
            selectedHero && <UnoVsUno jugador={selectedHero} selectedHeroId={selectedHeroId} />
          )

  );
};

export default Juego;