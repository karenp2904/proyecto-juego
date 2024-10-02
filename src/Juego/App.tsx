import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GameManager from './components/GameManager';
import UnoVsUno from './components/UnoVsUno';
import CrearPartidaPage from './components/CrearPartida';
import ModosDeJuego from './components/ModosDejuego';
import UnirseapartidaPage from './components/UnirseAPartida';
import Inventario from './components/Inventario';
import styles from './styles/App.module.css';
import Combatiente from './interfaces/Combatiente';

const App: React.FC = () => {
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
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/crearpartida" />} />
        <Route path="/crearpartida" element={<CrearPartidaPage />} />
        <Route path="/modosdejuego" element={<ModosDeJuego />} />
        <Route path="/unirseapartida" element={<UnirseapartidaPage />} />
        <Route path="/lobby" element={
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
        } />
        <Route path="/inventario" element={<Inventario />} />
      </Routes>
    </Router>
  );
};

export default App;