import React, { useState, useEffect } from 'react';
import AuctionProductCard from './TarjetaProducto/AuctionProductCardProps'
import './Auction.css'
import { url } from 'inspector';
import NavBar from '../NavBar/NavBar';
import AuctionProduct from '../types/AuctionProduct';
import axios from 'axios';

const Auction: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState(''); // Controla el término de búsqueda


    const [products, setProducts] = useState<AuctionProduct[]>([]); // Estado inicial 
    // Método para obtener los productos subastados
    const fetchProducts = async () => {
        try {

            const config = fetch("../server-ip-config.json") as unknown as ConfigInterface
            const ip = config.ip
            const port = config.port
            let data: AuctionProduct[] = await axios.post(`http://${ip}:${port}/api/subastas`)
            // const response = await fetch(''); 
            // const data = await response.json();
            data = [
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
                    name: 'Espada ',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 3,
                },
                {
                    id: '3',
                    name: ' Escudo',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 2,
                },
                {
                    id: '4',
                    name: 'Pocion',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 5,
                },
                {
                    id: '5',
                    name: 'Martillo Magico',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 4,
                }
            ]

            setProducts(data); // Actualiza el estado de productos
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

   
    useEffect(() => {
        fetchProducts();
    }, []); // Solo se ejecuta una vez

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Actualiza el valor de búsqueda en el estado
    };

    // Filtra los productos del inventario según el valor de búsqueda
    const filteredInventory = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        
        <div className="auction-window">
           <NavBar/>
            <h2> </h2>
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
                <button className='button-add'onClick={() => window.location.href = "/Subasta/NuevoProducto"}>Subastar Producto</button>
            </div>
            <div className="product-list">
                {filteredInventory.length > 0 ? (
                    filteredInventory.map((product) => (
                        <AuctionProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            currentBid={product.currentBid}
                            buyNowPrice={product.buyNowPrice}
                            auctionEndTime={product.auctionEndTime}
                        />
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};

export default Auction;
interface ConfigInterface{
    ip: string;
    port: string;
}