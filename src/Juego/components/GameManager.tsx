import React from 'react';
import Lobby from './Lobby';
import Combatiente from '../interfaces/Combatiente';

interface GameManagerProps {
  onStartGame: (hero: Combatiente) => void;
  onHeroSelect: (heroId: string) => void;
}

const GameManager: React.FC<GameManagerProps> = ({ onStartGame, onHeroSelect }) => {
  const handleEquipHero = (hero: Combatiente) => {
    // Lógica para equipar héroe...
    console.log("Equipando héroe:", hero);
  };

  return (
    <Lobby
      onStartGame={onStartGame}
      onEquipHero={handleEquipHero}
      onHeroSelect={onHeroSelect}
    />
  );
};

export default GameManager;