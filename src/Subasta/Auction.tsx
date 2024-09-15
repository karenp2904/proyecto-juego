import React, { useState } from 'react';
import AuctionProductCard from './TarjetaProducto/AuctionProductCardProps'
import './Auction.css'
import { url } from 'inspector';

interface AuctionProduct {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    currentBid: number;
    buyNowPrice: number;
    auctionEndTime: string;
}

const Auction: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState(''); // Controla el término de búsqueda

    const [products, setProducts] = useState<AuctionProduct[]>([
        {
            id: '1',
            name: 'Espada Épica',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
        {
            id: '2',
            name: 'Espada ',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
        {
            id: '3',
            name: ' Escudo',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
        {
            id: '4',
            name: 'Pocion',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
        {
            id: '5',
            name: 'Martillo Magico',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },

      
    ]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value); // Actualiza el valor de búsqueda en el estado
    };

    // Filtra los productos del inventario según el valor de búsqueda
    const filteredInventory = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="auction-window">
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
                <button className='button-add'onClick={() => window.location.href = "/Subasta/NuevoProducto"}>SUBASTAR PRODUCTO</button>
            </div>
            <div className="product-list">
                {filteredInventory.length > 0 ? (
                    filteredInventory.map((product) => (
                        <AuctionProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            imageUrl={product.imageUrl}
                            currentBid={product.currentBid}
                            buyInmediatly={product.buyNowPrice}
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
