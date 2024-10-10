import React from 'react';
import '../styles/Victory.css'
interface VictoryPanelProps {
  creditsWon: number;
  onClose: () => void;
}

const VictoryPanel: React.FC<VictoryPanelProps> = ({ creditsWon, onClose }) => {
  return (
    <div className="ictory-overlay">
      <div className="victory-panel">
        <h2>¡Victoria!</h2>
        <p className='victory-panel-message'>¡Felicidades! Has ganado {creditsWon} créditos por tu victoria.</p>
        <button className="victory-close-button" onClick={onClose}>✖</button>
      </div>
    </div>
  );
};

export default VictoryPanel;
