import React from 'react';
import './ConfirmationPanel.css'


const ConfirmationPanel: React.FC<{ type:string, message: string, onClose: () => void }> = ({ type,message, onClose }) => {

    return (
        <div className="confirmation-overlay">
           
            <div className="confirmation-panel">
                <h2>¡{type}!</h2>
                <p className='confirmar-p'> {message}.</p>
                <button className="btn2-closer" onClick={onClose}>✖</button>
            </div>
        </div>
    );
};





export default ConfirmationPanel;
