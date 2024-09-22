import React, { useState } from 'react';
import './BidForm.css';
import ConfirmationPanel from '../Confirmacion/ConfirmationPanel';
import AuctionProduct from '../../types/AuctionProduct';
import { useAuth } from "../../hooks/useAuth";
import axios from 'axios';
import Environment from "../../shared/Environment";


interface BidFormProps {
    product: AuctionProduct;
    onClose: () => void; // Función para cerrar el formulario
}

const BidForm: React.FC<BidFormProps> = ({ product, onClose }) => {


    const user = useAuth(s => s.user);


    const [bidAmount, setBidAmount] = useState(product.currentBid + 1);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [offerType, setOfferType] = useState('oferta');
    const [confirmationMessage, setConfirmationMessage]= useState('');


    const handleBidSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (offerType === 'compra') {

            // Si el tipo es 'compra', se toma el valor de la compra inmediata
            console.log(`Compra inmediata: ${product.buyNowPrice}`);
              // Establecer el mensaje de confirmación
            setConfirmationMessage(`Compra aprobada por ${product.buyNowPrice}`);
            setShowConfirmation(true);
            //endpoint para retirar el producto

            setShowConfirmation(true)

            console.log(user?.iduser + '-'+ user?.name)
        } else if (offerType === 'oferta') {
            // Si el tipo es 'oferta', se toma el valor de la oferta ingresada
            if (bidAmount) {
                console.log(`Oferta enviada: ${bidAmount}`);
                const idAuction= product.idAuction              
            
                axios.post(`${Environment.getDomain()}/api/.... `,{ idAuction, bidAmount  }).then(response =>{
                    if (response.data.answer){
                        //setShowConfirmation(true)
                        setConfirmationMessage(`Su oferta por ${bidAmount} ha sido aprobada`);

                    }
                })
                setConfirmationMessage(`Su oferta por ${bidAmount} ha sido aprobada`);

             
                setShowConfirmation(true)


            } else {
                console.log('Por favor, ingresa un valor de oferta.');
            }
        }
    };


    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        onClose(); // Cerrar am
        console.log(user?.iduser + '-'+ user?.name)

    };

    return (
        <div className="bid-form">
            <h3>NUEVA PUJA</h3>
            <h3 className='name-product'>{product.name}</h3>
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
                                min={product.currentBid + 1}
                                onChange={(e) => setBidAmount(Number(e.target.value))}
                            />
                        </>
                )}

                {showConfirmation && (
                    <ConfirmationPanel 
                        type={offerType === 'compra' ? 'COMPRA APROBADA' : 'OFERTA ENVIADA'} 
                        message={offerType === 'compra' ? `Compra aprobada por ${product.buyNowPrice}` : `Su oferta por ${bidAmount} ha sido aprobada`}
                        onClose={handleCloseConfirmation} 
                    />
                )}


                </div>
               


                <button type="submit" className="btn-offer">
                    {offerType === 'compra' ? 'Comprar ahora' : 'Enviar oferta'}
                </button>
                <button type="button" className="btn-closer" onClick={onClose}>
                    Cancelar
                </button>
            </form>

            
        </div>
    );
};

export default BidForm;
