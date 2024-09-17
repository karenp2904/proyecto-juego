"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AuctionProductCardProps_1 = __importDefault(require("./Componentes/AuctionProductCardProps"));
require("./Auction.css");
const Auction = () => {
    const [products, setProducts] = (0, react_1.useState)([
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
    const handleBid = (productId) => {
        // Lógica para hacer una oferta
        console.log(`Puja realizada para el producto con ID: ${productId}`);
        // Aquí iría la lógica para actualizar la oferta actual
    };
    const handleBuyNow = (productId) => {
        // Lógica para compra inmediata
        console.log(`Compra inmediata realizada para el producto con ID: ${productId}`);
        // Aquí iría la lógica para procesar la compra
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "auction-window" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: " " }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "product-list" }, { children: products.map((product) => ((0, jsx_runtime_1.jsx)(AuctionProductCardProps_1.default, { id: product.id, name: product.name, imageUrl: product.imageUrl, currentBid: product.currentBid, auctionEndTime: product.auctionEndTime, onBid: handleBid, onBuyNow: handleBid }, product.id))) }))] })));
};
exports.default = Auction;
