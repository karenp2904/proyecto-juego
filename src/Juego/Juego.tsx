import React, { useState } from 'react';
import Lobby from './components/Lobby';
import UnoVsUno from './components/UnoVsUno';
import  './styles/App.css';

const Juego: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);

  const handleConfigureHero = () => {
    console.log("Configurando héroe");
  };

  const handleStartGame = () => {
    if (selectedHero) {
      setGameStarted(true);
    }
  };

  const handleSelectHero = (hero: string) => {
    setSelectedHero(hero);
  };

  return (
    <div className='appContainer'>
      {!gameStarted ? (
        <div className='lobbyBackground'>
          <Lobby 
            onConfigureHero={handleConfigureHero}
            onStartGame={handleStartGame}
            selectedHero={selectedHero}
            onSelectHero={handleSelectHero}
          />
        </div>
      ) : (
        <UnoVsUno />
      )}
    </div>
  );
};

export default Juego;
