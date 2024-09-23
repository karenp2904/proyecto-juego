import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddAuction.css'
import Product from '../../types/Product';
import { useAuth } from "../../hooks/useAuth";
import { Router } from "../../Router/Router";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ConfirmationPanel from '../Confirmacion/ConfirmationPanel';
import Environment from "../../shared/Environment";


const AddAuction: React.FC = () => {

    const user = useAuth(s => s.user);

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
    
        setInventory(data); // Actualiza el estado de productos
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

    const handleAddProduct = () => {


        console.log(user?.iduser + '-'+ user?.name)

        if (selectedProduct) {
            const productToAdd = {
                idproduct: selectedProduct.id,
                iduser: user?.iduser,
                currentBid: auctionDetails.currentBid,
                buyNowPrice: auctionDetails.buyNowPrice,
                auctionEndTime: auctionDetails.auctionEndTime,
            };

            // Verifica que el valor inicial sea menor que el valor de compra inmediata
            if (Number(productToAdd.currentBid) >= Number(productToAdd.buyNowPrice)) {
                setConfirmationMessage('El valor inicial debe ser menor que el valor de compra inmediata');
                setShowConfirmation(true)

                return; // Detiene el envío si no cumple con la validación
            }else if(Number(productToAdd.buyNowPrice<=Number(productToAdd.currentBid))){
                setConfirmationMessage('El valor de compra inmediata debe ser mayor al valor inicial');
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
            <div className="container mt-5">
               
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

