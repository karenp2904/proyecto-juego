import React, { useState } from 'react';
import './BidForm.css';
import ConfirmationPanel from './Confirmacion/ConfirmationPanel';

interface BidFormProps {
    name: string;
    currentBid: number;
    onClose: () => void;
}

const BidForm: React.FC<BidFormProps> = ({ name, currentBid, onClose }) => {
    const [bidAmount, setBidAmount] = useState(currentBid + 1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [offerType, setOfferType] = useState('oferta'); // Nueva selección para tipo de oferta

    const handleBidSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('panel de confirmacion');
        setShowConfirmation(true);


    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        onClose(); // Cerrar tanto el ConfirmationPanel como el BidForm
    };

    return (
        <div className="bid-form">
            <h3>NUEVA PUJA</h3>
            <h3 className='name-product'>{name}</h3>
            <form onSubmit={handleBidSubmit}>
                <div className="separator">
                    <label htmlFor="offer-type">Tipo de operación:</label>
                    <select
                        id="offer-type"
                        value={offerType}
                        onChange={(e) => setOfferType(e.target.value)}
                    >
                        <option value="compra">Compra inmediata</option>
                        <option value="oferta">Realizar oferta</option>
                    </select>
                </div>
                <div className="separator">
                    
                    {offerType === 'oferta' && (
                        <>
                            <label htmlFor="bid-amount">Tu oferta:</label>
                            <input
                                type="number"
                                id="bid-amount"
                                value={bidAmount}
                                min={currentBid + 1}
                                onChange={(e) => setBidAmount(Number(e.target.value))}
                            />
                        </>
                )}
                </div>
               


                <button type="submit" className="btn-offer">
                    {offerType === 'compra' ? 'Comprar ahora' : 'Enviar oferta'}
                </button>
                <button type="button" className="btn-closer" onClick={onClose}>
                    Cancelar
                </button>
            </form>

            {showConfirmation && (
                <ConfirmationPanel 
                    bidAmount={bidAmount} 
                    name={name}
                    onClose={handleCloseConfirmation} // Función que cierra el panel y el formulario
                />
            )}
        </div>
    );
};

export default BidForm;
