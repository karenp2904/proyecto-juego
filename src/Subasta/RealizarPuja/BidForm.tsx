import React, { useState } from 'react';
import './BidForm.css';
import ConfirmationPanel from '../Confirmacion/ConfirmationPanel';
import AuctionProduct from '../../types/AuctionProduct';
import { useAuth } from "../../hooks/useAuth";
import Environment from "../../shared/Environment";
import Notificaciones from '../Notificacion/Notificaciones';

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
    const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensajes de error



    const   handleBidSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

          // Validación de créditos del usuario
        if (user) {

            if (offerType === 'compra') {

                const credits= await getCredits(user.iduser)
                console.log(credits)

                if (credits<product.buyNowPrice) {
                    setErrorMessage('No tienes suficientes créditos para la compra.');
                   
                    return;
                }else{ 
                    console.log(`Compra inmediata: ${product.buyNowPrice}`);

                    const response = await fetch(`${Environment.getDomain()}/api/buyInmediatly`, {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ iduser: user.iduser, idauction: product.idAuction, bidAmount: product.buyNowPrice }),
                    });


                    if (response.ok) {
                        const data = await response.json();
                        console.log(data)
                        Notificaciones.anunciarGanador(product.idAuction)
                        setConfirmationMessage(`Su compra por ${product.buyNowPrice} ha sido aprobada`);
                        setShowConfirmation(true);
                        setCredits(user.iduser,(user.credits-product.buyNowPrice))


                    } else {
                        const errorData = await response.json();
                        console.log('Error:', errorData);
                    }
                    
                }

                
    
            } else if (offerType === 'oferta') {
                // Si el tipo es 'oferta', se toma el valor de la oferta ingresada
                if (bidAmount) {
                    const credits= await getCredits(user.iduser)

                    if (credits < bidAmount) {
                        setErrorMessage('No tienes suficientes créditos para la oferta.');
                        
                        return;
                    }else{
                        console.log(`Oferta enviada: ${bidAmount}`);
                               

                        console.log( user.iduser, '-',product.idAuction,'-', bidAmount )
                          // Realizar una solicitud GET con Axios
                            const response = await fetch(`${Environment.getDomain()}/api/new/bid`, {
                                method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ iduser: user.iduser, idauction: product.idAuction, bidAmount: bidAmount }),
                            });


                            if (response.ok) {
                               
                                setConfirmationMessage(`Su oferta por ${bidAmount} ha sido aprobada`);
                                setShowConfirmation(true);
                                setCredits(user.iduser,(user.credits-product.buyNowPrice))

                            } else {
                                const errorData = await response.json();
                                console.log('Error:', errorData);
                            }
                            
                        }
        
    
                } else {
                    console.log('Por favor, ingresa un valor de oferta.');
                }
            }else{
                
            }
            
        
        }

        
    };

   

    async function setCredits(idUser:number, credits:number){
        // Realizar una solicitud GET con Axios
        const response = await fetch(`${Environment.getDomain()}/api/setCredits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ iduser: idUser , credits:credits}),
        });
    
        if (response.ok) {
          console.log()
          return response.json()
    
        }else{
          return null
        }
    }

    async function getCredits(iduser:number){
        // Realizar una solicitud GET con Axios
        console.log(iduser + "ksksk")
        console.log(JSON.stringify({iduser: iduser}))

        const response = await fetch(`${Environment.getDomain()}/api/getCredits`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({iduser: iduser}),
        });
    
        if (response.ok) {
        
          const data= await response.json()
          console.log(data.usuario)
          return data.usuario
    
        }else{
          return null
        }
    }


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

                {errorMessage && <p className="error-message">{errorMessage}</p>}


            

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
