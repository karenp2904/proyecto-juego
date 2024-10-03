import React from 'react';

interface WinnerProps {
    winnerName: string;
    productName: string;
    onAcknowledge: () => void;  // Acción al hacer clic en el botón de cerrar
}

const AuctionWinner: React.FC<WinnerProps> = ({ winnerName, productName, onAcknowledge }) => {
    return (
        <div className="auction-winner-container">
            <div className="winner-details">
                <h2 className="congratulations-message">¡Felicitaciones {winnerName}!</h2>
                <p className="winner-announcement">Has ganado la subasta de:</p>
                <h3 className="product-name1">{productName}</h3>
            </div>
            <button className="close-button" onClick={onAcknowledge}>Cerrar</button>
        </div>
    );
};

export default AuctionWinner;
