import React, { useState, useEffect } from 'react';
import Combatiente from '../interfaces/Combatiente';
import Acciones from '../interfaces/Acciones';
import combatienteData from '../data/combatiente.json';
import accionesDataRaw from '../data/acciones.json';
import styles from '../styles/HeroSelection.module.css';
import { mapToAcciones, RawAccion } from '../utils/accionesMapper';

const accionesData: RawAccion[] = accionesDataRaw as RawAccion[];

interface HeroSelectionProps {
  onHeroSelect: (hero: Combatiente, actions: Acciones[]) => void;
}

const HeroSelection: React.FC<HeroSelectionProps> = ({ onHeroSelect }) => {
  const [heroes, setHeroes] = useState<Combatiente[]>([]);
  const [selectedHero, setSelectedHero] = useState<Combatiente | null>(null);
  const [heroActions, setHeroActions] = useState<Acciones[]>([]);

  useEffect(() => {
    const playerHeroes = combatienteData.filter(hero => hero._id !== "64d3402d681948532712a45z");
    setHeroes(playerHeroes);
  }, []);

  const handleHeroSelect = (hero: Combatiente) => {
    setSelectedHero(hero);
    const actions = accionesData
      .filter(action => action.heroType === hero.type && hero.level >= action.minLevel)
      .map(mapToAcciones);
    setHeroActions(actions);
  };

  const handleConfirmSelection = () => {
    if (selectedHero) {
      onHeroSelect(selectedHero, heroActions);
    } 
  };

  return (
    <div className={styles.heroSelectionContainer}>
      <h1 className={styles.title}>Selecciona tu héroe</h1>
      <div className={styles.heroGrid}>
        {heroes.map(hero => (
          <div
            key={hero._id}
            className={`${styles.heroCard} ${selectedHero?._id === hero._id ? styles.selected : ''}`}
            onClick={() => handleHeroSelect(hero)}
          >
            <h2 className={styles.heroName}>{hero.name}</h2>
            <div className={styles.heroInfo}>
              <p>Tipo: {hero.type}</p>
              <p>Nivel: {hero.level}</p>
              <p>Vida: {hero.health}/{hero.maxHealth}</p>
              <p>Ataque: {hero.attack}</p>
              <p>Defensa: {hero.defense}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedHero && (
        <div className={styles.heroActions}>
          <h3 className={styles.actionsTitle}>Acciones de {selectedHero.name}</h3>
          <ul className={styles.actionsList}>
            {heroActions.map(action => (
              <li key={action._id} className={styles.actionItem}>
                {action.name} <span className={styles.actionCost}>(Costo: {action.powerCost} PP)</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        className={styles.confirmButton}
        onClick={handleConfirmSelection}
        disabled={!selectedHero}
      >
        Confirmar selección
      </button>
    </div>
  );
};

export default HeroSelection;