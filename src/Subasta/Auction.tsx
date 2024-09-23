import React, { useState, useEffect } from 'react';
import AuctionProductCard from './TarjetaProducto/AuctionProductCardProps'
import './Auction.css'
import NavBar from '../NavBar/NavBar';
import AuctionProduct from '../types/AuctionProduct';
import Environment from "../shared/Environment";

const Auction: React.FC = () => {

    const [searchTerm, setSearchTerm] = useState(''); // Controla el término de búsqueda


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
            const mappedData: AuctionProduct[] = data.map((item: any) => ({

                idAuction: item.idauction.toString(),
                idProduct: item.idproduct?.toString() || '',
                name: item.name,
                description: item.description,
                imageUrl: item.image,
                initialAmount: item.initialAmount ? parseFloat(item.initialAmount) : 0,
                currentBid: parseFloat(item.current_bid),
                buyNowPrice: parseFloat(item.buy_now_price),
                auctionEndTime: new Date(item.end_time).getTime()
            }));
    
            console.log(mappedData);  // Aquí puedes utilizarlo según tu lógica
    
            setProducts(mappedData)
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
    
    /*
    const fetchProducts = async () => {
        try {
            // Obtén la configuración del archivo JSON
            const configResponse = await fetch("../server-ip-config.json");
            if (!configResponse.ok) throw new Error('Error al obtener la configuración');
           // const config = await configResponse.json();
           // const ip = config.ip;
            //const port = config.port;
    
            // Realiza la solicitud a la API
            const response = await fetch('http://localhost:4000/api/subastas');
            if (!response.ok) throw new Error('Error en la solicitud de subastas');
            
            // Parsea la respuesta como JSON
            const data = await response.json();
            
            // Verifica que `data` sea un array
            if (!Array.isArray(data)) {
                throw new TypeError('La respuesta no es un array');
            }

            console.log(data + '<-')
    
             // Mapea los datos a la interfaz `AuctionProduct`
        const mappedData: AuctionProduct[] = data.map((item: any) => ({
            idAuction: item.idauction.toString(), // Convertir a string si es necesario
            idProduct: item.idproduct?.toString() || '', // Asegúrate de tener un valor adecuado
            name: item.name,
            description: item.description,
            imageUrl: item.image, // Usar la clave correcta
            initialAmount: item.initialAmount ? parseFloat(item.initialAmount) : 0, // Convertir a número
            currentBid: parseFloat(item.current_bid), // Convertir a número
            buyNowPrice: parseFloat(item.buy_now_price), // Convertir a número
            auctionEndTime: new Date(item.end_time).getTime() // Convertir a timestamp
        }));
            // Actualiza el estado de productos
            console.log(mappedData);  // Aquí puedes utilizarlo según tu lógica
    
            setProducts(mappedData)
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    }
    */
       
            // const response = await fetch(''); 
            // const data = await response.json();
            /*
            data = [
                {
                    idAuction:'1',
                    idProduct: '1',
                    name: 'Espada Épica',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 2,
                },
                {
                    idAuction:'2',
                    idProduct: '2',
                    name: 'Espada ',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 3,
                },
                {
                    idAuction:'3',
                    idProduct: '3',
                    name: ' Escudo',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 2,
                },
                {
                    idAuction:'4',
                    idProduct: '4',
                    name: 'Pocion',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 5,
                },
                {
                    idAuction:'5',
                    idProduct: '5',
                    name: 'Martillo Magico',
                    description: 'Una espada legendaria con poderosos encantamientos.',
                    imageUrl: '/Images/imagenPruebaSubasta.jpg',
                    currentBid: 100,
                    buyNowPrice: 500,
                    auctionEndTime: 4,
                }
            ]
                */

           // setProducts(data); // Actualiza el estado de productos
    
    


   
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
                    <p>No se encontraron productos.</p>
                )}
            </div>
        </div>
    );
};


export default Auction;
