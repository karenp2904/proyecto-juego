import React, { useState, useEffect } from 'react';
import AuctionProductCard from './TarjetaProducto/AuctionProductCardProps'
import './Auction.css'
import NavBar from '../NavBar/NavBar';
import AuctionProduct from '../types/AuctionProduct';
import Environment from "../shared/Environment";
import { Router } from '../Router/Router';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons'; // Importa el icono de campana para notificaciones
import NotificationPanel from './Notificacion/NotificationPanel';
import { constants } from 'buffer';

const Auction: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState(''); // Controla el término de búsqueda
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false); // Controla el despliegue de las notificaciones


    const [products, setProducts] = useState<AuctionProduct[]>([]); // Estado inicial 
    // Método para obtener los productos subastados
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${Environment.getDomain()}/api/subastas`);
            
            // Verifica si la respuesta no es ok
            if (!response.ok) throw new Error('Error en la solicitud de subastas');

            
            // Intenta analizar la respuesta como JSON
            const data = await response.json()
            console.log(data)
            // Mapea los datos a la interfaz `AuctionProduct`
            const mappedData: AuctionProduct[] = data.map((item: any) => {
                // Depuración: verifica el valor de `description`
                    console.log("Description:", item.description);
                    console.log("Image URL before:", item.imageUrl);

                    const imageUrl = item.description?.toLowerCase() === 'item'
                        ? `/${item.imageUrl}` // Agregar '/' solo si description es 'item'
                        : item.imageUrl;

                    // Si 'imageUrl' ya comienza con '/', eliminar el duplicado
                    const finalImageUrl = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
                    return {
                        idAuction: item.id,
                        idProduct: item.idproduct?.toString() || '',
                        name: item.name,
                        description: item.description,
                        imageUrl: finalImageUrl, // Usa la URL final procesada
                        initialAmount: item.currentBid ? parseFloat(item.initialAmount) : 0,
                        currentBid: parseInt(item.currentBid, 10), // Base 10 para evitar errores
                        buyNowPrice: parseInt(item.buyNowPrice, 10), // Base 10 para evitar errores
                        auctionEndTime: item.auctionEndTime
                    };  
                });
 
            console.log(mappedData);  // Aquí puedes utilizarlo según tu lógica
    
            setProducts(mappedData)
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }



   
    
    useEffect(() => {
        // Ejecuta fetchProducts al cargar el componente
        fetchProducts();
        
        // Establece el intervalo para ejecutar la función periódicamente
        const intervalId = setInterval(fetchProducts, 5000); // 5000 ms = 5 segundos

        // Limpia el intervalo cuando se desmonte el componente
        return () => clearInterval(intervalId);
    }, []); // El array vacío asegura que useEffect se ejecute solo una vez


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Actualiza el valor de búsqueda en el estado
    };

    // Filtra los productos del inventario según el valor de búsqueda
    const filteredInventory = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToAdd=()=>{
       navigate(Router.subastarProducto)
    }

    // Manejar el despliegue del panel de notificaciones
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <div className="auction-window">
            <NavBar />
            <h2></h2>

            <div className="top-bar">
                {/* Botón de notificación */}
                <button className="notification-button" onClick={toggleNotifications}>
                    <FontAwesomeIcon icon={faBell} />
                </button>
                {showNotifications && <NotificationPanel />} {/* Mostrar el panel de notificaciones si el estado es true */}
            </div>
            <div className="search-auction">
                <input
                    type="text"
                    className="barra"
                    placeholder="Buscar en subastas..."
                    value={searchTerm}
                    onChange={handleSearchChange} // Maneja el cambio de búsqueda
                />
            </div>
           

            <div className='button-space'>
                <button className='button-add' onClick={handleToAdd}>Subastar Producto</button>
            </div>

            <div className="product-list">
                {filteredInventory.length > 0 ? (
                    filteredInventory.map((product) => (
                        <AuctionProductCard
                            key={product.idAuction}
                            idAuction={product.idAuction}
                            idProduct={product.idProduct}
                            name={product.name}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            currentBid={product.currentBid}
                            buyNowPrice={product.buyNowPrice}
                            auctionEndTime={product.auctionEndTime}
                        />
                    ))
                ) : (
                    <p className='nofound-products'>No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};

export default Auction;
