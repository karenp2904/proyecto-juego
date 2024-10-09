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

                    try {
                        const response = await fetch(`${Environment.getDomain()}/api/buyInmediatly`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                iduser: user.iduser,
                                idauction: product.idAuction,
                                bidAmount: product.buyNowPrice,
                            }),
                        });
                    
                        // Verificar si la respuesta fue exitosa
                        if (!response.ok) {
                            const errorData = await response.json();
                            console.error('Error en la compra inmediata:', errorData);
                            setConfirmationMessage('Hubo un problema con su compra inmediata. Por favor, inténtelo nuevamente.');
                            setShowConfirmation(true);
                            return;
                        }
                    
                        // Obtener datos de la respuesta si es exitosa
                        const data = await response.json();
                        console.log('Compra exitosa:', data);
                    
                        // Notificar al ganador
                        try {
                            Notificaciones.anunciarGanador(product.idAuction);
                        } catch (error) {
                            console.error('Error al notificar al ganador:', error);
                        }
                    
                        // Confirmar la compra al usuario
                        setConfirmationMessage(`Su compra por ${product.buyNowPrice} ha sido aprobada`);
                        setShowConfirmation(true);
                    
                        // Actualizar créditos del usuario
                        try {
                            setCredits(user.iduser,(user.credits-product.buyNowPrice))
                        } catch (error) {
                            console.error('Error al actualizar los créditos del usuario:', error);
                        }
                    
                    } catch (error) {
                        console.error('Error en la solicitud de compra inmediata:', error);
                        setConfirmationMessage('Error de conexión. Por favor, revise su conexión y vuelva a intentarlo.');
                        setShowConfirmation(true);
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
                          try {
                            const response = await fetch(`${Environment.getDomain()}/api/new/bid`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    iduser: user.iduser,
                                    idauction: product.idAuction,
                                    bidAmount: bidAmount,
                                }),
                            });
                        
                            // Verificar si la respuesta fue exitosa
                            if (!response.ok) {
                                throw new Error(`Error en la solicitud: ${response.status} - ${response.statusText}`);
                            }
                        
                            if (response.ok) {
                               
                                setConfirmationMessage(`Su oferta por ${bidAmount} ha sido aprobada`);
                                setShowConfirmation(true);
                                setCredits(user.iduser,(user.credits-bidAmount))

                                if(bidAmount>=product.buyNowPrice){
                                    Notificaciones.anunciarGanador(product.idAuction)
                                }


                            } 
                        } catch (error) {
                            console.error('Error al realizar la oferta:', error);
                            alert('Hubo un problema al procesar tu oferta. Por favor, intenta de nuevo.');
                            return null;
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
        try {
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
        } catch (error) {
            // Captura errores 
            console.error('Error al realizar la solicitud:', error);
            return null;
        }
    }

    async function getCredits(iduser: number) {
        console.log(iduser + "ksksk");
        console.log(JSON.stringify({ iduser: iduser }));
    
        try {
            const response = await fetch(`${Environment.getDomain()}/api/getCredits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ iduser: iduser }),
            });
    
            if (!response.ok) {
                console.warn(`Error en la solicitud: ${response.status} ${response.statusText}`);
                return null;  // Maneja el caso cuando la respuesta no es exitosa
            }
    
            const data = await response.json();
            console.log(data.usuario);
            return data.usuario;
        } catch (error) {
            // Captura errores de red o excepciones en la solicitud
            console.error('Error al realizar la solicitud:', error);
            return null;
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
