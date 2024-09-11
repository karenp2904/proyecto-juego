import React, { useState } from 'react';
import AuctionProductCard from './Componentes/AuctionProductCardProps'
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
            id: '1',
            name: 'Espada Épica',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
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
            id: '1',
            name: 'Espada Épica',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '2024-09-01T12:00:00',
        },
     
        // Más productos aquí
    ]);

    const handleBid = (productId: string) => {
        // Lógica para hacer una oferta
        console.log(`Puja realizada para el producto con ID: ${productId}`);
        // Aquí iría la lógica para actualizar la oferta actual
    };

    const handleBuyNow = (productId: string) => {
        // Lógica para compra inmediata
        console.log(`Compra inmediata realizada para el producto con ID: ${productId}`);
        // Aquí iría la lógica para procesar la compra
    };

    return (
        <div className="auction-window">
            <h2> </h2>
            <div className="product-list">
                {products.map((product) => (
                    <AuctionProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        imageUrl={product.imageUrl}
                        currentBid={product.currentBid}
                        
                        auctionEndTime={product.auctionEndTime}
                        onBid={handleBid}
                        onBuyNow={handleBid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Auction;
