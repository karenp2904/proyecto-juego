import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddAuction.css'
import Product from '../../types/Product';
import { useAuth, useUpdateUserCredits } from "../../hooks/useAuth";
import { Router } from "../../Router/Router";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ConfirmationPanel from '../Confirmacion/ConfirmationPanel';
import Environment from "../../shared/Environment";


const AddAuction: React.FC = () => {

    const user = useAuth(s => s.user);
    useUpdateUserCredits();

    const navigate = useNavigate();

    const handleToSubasta = ()=>{
        navigate(Router.subasta)
        console.log(user)
    }

    const [confirmationMessage, setConfirmationMessage]= useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);


    const [inventory, setInventory] = useState<Product[]>([]); // Estado inicial 
    

     // Método para obtener los productos subastados
     const fetchProducts = async () => {
        try {
    /*
            const response = await fetch(`${Environment.getDomainInventory()}/inventary/:${user?.iduser}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          
              if (response.ok) {
                console.log(await response.json)
                const data= await response.json
                console.log(data)
          
              }
              */
           // const response = await fetch(''); 
           // const data = await response.json();
       
           const data: Product[] =  [
            {
                id: '1',
                name: 'Espada Épica',
                description: 'Una espada legendaria con poderosos encantamientos.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 100,
                buyNowPrice: 500,
                auctionEndTime: 2,
            },
            {
                id: '2',
                name: 'Escudo Mágico',
                description: 'Un escudo con propiedades defensivas únicas.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 50,
                buyNowPrice: 300,
                auctionEndTime: 1,
            },
            {
                id: '3',
                name: 'Poción de Vida',
                description: 'Recupera completamente la salud del usuario.',
                imageUrl: '/Images/imagenPruebaSubasta.jpg',
                currentBid: 20,
                buyNowPrice: 100,
                auctionEndTime: 5,
            },
           
            
        ];
        setInventory(data)
       
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

   
    useEffect(() => {
        fetchProducts();
    }, []); // Solo se ejecuta una vez

   
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [auctionDetails, setAuctionDetails] = useState({
        currentBid: 0,
        buyNowPrice: 0,
        auctionEndTime: '',
    });
    const [errorMessage, setErrorMessage] = useState(''); // Para mostrar mensajes de error

    const handleSelectProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAuctionDetails({
            ...auctionDetails,
            [name]: value,
        });
    };

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
          console.log(data.usuario + 'creditosUser')
          return data.usuario
    
        }else{
          return null
        }
    }

    const changeCredits = async (auctionEndTime: number) => {

        let credits=0
        if(user){
           credits = await getCredits(user?.iduser)
          
        }
        let creditsToDeduct = 0;
      
     // Determina la cantidad de créditos a restar según los días de subasta
        if (auctionEndTime === 1) { 
            creditsToDeduct = 1;  // 1 día => 1 crédito
        } else if (auctionEndTime === 2) {
            creditsToDeduct = 3;  // 2 días => 3 créditos
        } else if (auctionEndTime > 2) {
            creditsToDeduct = 3 + (auctionEndTime - 2) * 2;  // Cada día adicional suma 2 créditos más
        }

        // Asegúrate de no tener créditos negativos
        if(creditsToDeduct>credits){
            setErrorMessage('No tienes suficientes créditos para la duración de la subasta.');
            return false

        }else{
            const updatedCredits = (credits - creditsToDeduct);
            console.log(Number(user?.iduser), '-',Number(updatedCredits))
            await setCredits(Number(user?.iduser), Number(updatedCredits))
            return true
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
            const data = await response.json()
          console.log(data)
          return data
    
        }else{
          return null
        }
    }


    

    const handleAddProduct =async () => {


        console.log(user?.iduser + '-'+ user?.name)

        if (selectedProduct) {
            const productToAdd = {
                idproduct: selectedProduct.id,
                iduser: user?.iduser,
                currentBid: auctionDetails.currentBid,
                buyNowPrice: auctionDetails.buyNowPrice,
                auctionEndTime: auctionDetails.auctionEndTime,
            };

            const aprobar= await changeCredits(Number(productToAdd.auctionEndTime))
            // Verifica que el valor inicial sea menor que el valor de compra inmediata
            if (Number(productToAdd.currentBid) >= Number(productToAdd.buyNowPrice)) {
                setConfirmationMessage('El valor inicial debe ser menor que el valor de compra inmediata');
                setShowConfirmation(true)

                return; // Detiene el envío si no cumple con la validación
            }else if(Number(productToAdd.buyNowPrice<=Number(productToAdd.currentBid))){
                setConfirmationMessage('El valor de compra inmediata debe ser mayor al valor inicial');
                setShowConfirmation(true)

                return; // Detiene el envío si no cumple con la validación
            }else if(!aprobar){
                setConfirmationMessage('No tiene sufientes créditos');
                setShowConfirmation(true)
                return; // Detiene el envío si no cumple con la validación

            }

            console.log('Producto añadido:', productToAdd);
         
            axios.post(`${Environment.getDomain()}/api/new/auction`, productToAdd)

            handleToSubasta()
        }
    }

    const handleAgain = ()=>{
        
    }
   
    return (
        <div className="auction-window">
            <div className="container ">
               
                <div className="card p-4">
               
                    <div className="row">
                        <div className="col-md-8">
                            <h4>Inventario del Jugador</h4>
                            
                            <div className="inventory-grid d-flex flex-wrap"  >
                                {inventory.map((item) => (
                                    <div key={item.id} className="card inventory-card m-3" onClick={() => handleSelectProduct(item)}>
                                            <img src={item.imageUrl} className="card-img-top" alt={item.name}  />                    
                                            <div className="card-body text-center">
                                            <h5 className="card-title-auction ">{item.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="col-md-6 ">
                    <button onClick={handleToSubasta} className="btn-closeAdd">x</button>
                        {selectedProduct && (
                            <div className="product-registration">
                                <h4>Producto Seleccionado: </h4>
                                <h4 className='name-product'>{selectedProduct.name} </h4>
                                <div className='marcoImagen'> 
                                    <img src={selectedProduct.imageUrl} className="img-fluid mb-3" alt={selectedProduct.name}  />
                                </div>
                                
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Valor Inicial</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="currentBid"
                                        placeholder="Monto Inicial"
                                        value={auctionDetails.currentBid}
                                        onChange={handleInputChange}
                                    />
                                    
                                </div>
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Valor Compra Inmediata</label>
                                        <input
                                        type="number"
                                        className="form-control"
                                        name="buyNowPrice"
                                        placeholder="Monto de Compra Inmediata"
                                        value={auctionDetails.buyNowPrice}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="form-group-auction">
                                    <label className='form-label-auction'>Días de Subasta</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="auctionEndTime"
                                        placeholder="Días de Subasta"
                                        value={auctionDetails.auctionEndTime}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}


                               
                                {showConfirmation && (
                                    <ConfirmationPanel 
                                        type={`NO ES VALIDO`} 
                                        message={confirmationMessage}
                                        onClose={() => setShowConfirmation(false)} // Cierra el panel
                                    />
                                )}

                                


                                <button onClick={handleAddProduct} className="btn-auction mt-3">Añadir Producto</button>
                                
                            </div>
                            )}
                        </div>
                    </div>
                </div>
        </div>
    );
}
export default AddAuction;

