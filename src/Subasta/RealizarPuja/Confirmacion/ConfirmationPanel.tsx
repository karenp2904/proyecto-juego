import React, { useState } from 'react';
import './ConfirmationPanel.css'


const ConfirmationPanel: React.FC<{ bidAmount: number, name: string, onClose: () => void }> = ({ bidAmount, name, onClose }) => {

    return (
        <div className="confirmation-overlay">
           
            <div className="confirmation-panel">
                <h2>¡Oferta enviada!</h2>
                <p className='confirmar-p'>Tu oferta de {bidAmount} créditos ha sido enviada para {name}.</p>
                <button className="btn2-close" onClick={onClose}>✖</button>
            </div>
        </div>
    );
};





export default ConfirmationPanel;
