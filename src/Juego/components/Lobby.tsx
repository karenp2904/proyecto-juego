import React from 'react';
import Button from "./Button";
import styles from '../styles/Lobby.module.css';

// Importa las imágenes de los héroes
import magoFuego from '../assets/MagoFuego.png';
import picaroMachete from '../assets/PícaroMachete.png';
import barbaroTanque from '../assets/BarbaroTanque.png';

interface LobbyProps {
  onConfigureHero: () => void;
  onStartGame: () => void;
  selectedHero: string | null;
  onSelectHero: (hero: string) => void;
}

const Lobby: React.FC<LobbyProps> = ({ onConfigureHero, onStartGame, selectedHero, onSelectHero }) => {
  const heroes = [
    { name: 'Mago de Fuego', image: magoFuego },
    { name: 'Pícaro Machete', image: picaroMachete },
    { name: 'Bárbaro Tanque', image: barbaroTanque }
  ];

  return (
    <div className={styles.lobbyContent}>
      <h1>The Nexus Battle III</h1>
      <p>Selecciona una opción para comenzar</p>
      <div className={styles.menuOptions}>
        <Button onClick={onConfigureHero}>Configurar Héroe</Button>
        <Button onClick={onStartGame} disabled={!selectedHero}>
          {selectedHero ? `Comenzar con ${selectedHero}` : 'Crear Partida'}
        </Button>
      </div>
      <div className={styles.heroSelection}>
        <h2>Selecciona tu héroe:</h2>
        <div className={styles.heroes}>
          {heroes.map((hero) => (
            <div 
              key={hero.name} 
              className={`${styles.hero} ${selectedHero === hero.name ? styles.selectedHero : ''}`}
              onClick={() => onSelectHero(hero.name)}
            >
              <img src={hero.image} alt={hero.name} />
              <p>{hero.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Lobby;