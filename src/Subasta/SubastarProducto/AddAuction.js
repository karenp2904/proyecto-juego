"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("bootstrap/dist/css/bootstrap.min.css");
require("./AddAuction.css");
const AddAuction = () => {
    const inventory = [
        {
            id: '1',
            name: 'Espada Épica',
            description: 'Una espada legendaria con poderosos encantamientos.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 100,
            buyNowPrice: 500,
            auctionEndTime: '',
        },
        {
            id: '2',
            name: 'Escudo Mágico',
            description: 'Un escudo con propiedades defensivas únicas.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 50,
            buyNowPrice: 300,
            auctionEndTime: '',
        },
        {
            id: '3',
            name: 'Poción de Vida',
            description: 'Recupera completamente la salud del usuario.',
            imageUrl: '/Images/imagenPruebaSubasta.jpg',
            currentBid: 20,
            buyNowPrice: 100,
            auctionEndTime: '',
        },
    ];
    const [selectedProduct, setSelectedProduct] = (0, react_1.useState)(null);
    const [auctionDetails, setAuctionDetails] = (0, react_1.useState)({
        currentBid: 0,
        buyNowPrice: 0,
        auctionEndTime: '',
    });
    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAuctionDetails(Object.assign(Object.assign({}, auctionDetails), { [name]: value }));
    };
    const handleAddProduct = () => {
        if (selectedProduct) {
            const productToAdd = Object.assign(Object.assign({}, selectedProduct), { currentBid: auctionDetails.currentBid, buyNowPrice: auctionDetails.buyNowPrice, auctionEndTime: auctionDetails.auctionEndTime });
            console.log('Producto añadido:', productToAdd);
            // Aquí podrías manejar la lógica de añadir el producto a la subasta
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "auction-window" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "container mt-5" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "card p-4" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "row" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "col-md-8" }, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Inventario del Jugador" }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inventory-grid d-flex flex-wrap" }, { children: inventory.map((item) => ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "card inventory-card m-3", onClick: () => handleSelectProduct(item) }, { children: [(0, jsx_runtime_1.jsx)("img", { src: item.imageUrl, className: "card-img-top", alt: item.name }), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "card-body text-center" }, { children: (0, jsx_runtime_1.jsx)("h5", Object.assign({ className: "card-title-auction " }, { children: item.name })) }))] }), item.id))) }))] })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "col-md-6 " }, { children: selectedProduct && ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "product-registration" }, { children: [(0, jsx_runtime_1.jsx)("h4", { children: "Producto Seleccionado: " }), (0, jsx_runtime_1.jsxs)("h4", Object.assign({ className: 'name-product' }, { children: [selectedProduct.name, " "] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'marcoImagen' }, { children: (0, jsx_runtime_1.jsx)("img", { src: selectedProduct.imageUrl, className: "img-fluid mb-3", alt: selectedProduct.name }) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group-auction" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: 'form-label-auction' }, { children: "Valor Inicial" })), (0, jsx_runtime_1.jsx)("input", { type: "number", className: "form-control", name: "currentBid", placeholder: "Monto Inicial", value: auctionDetails.currentBid, onChange: handleInputChange })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group-auction" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: 'form-label-auction' }, { children: "Valor Compra Inmediata" })), (0, jsx_runtime_1.jsx)("input", { type: "number", className: "form-control", name: "buyNowPrice", placeholder: "Monto de Compra Inmediata", value: auctionDetails.buyNowPrice, onChange: handleInputChange })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group-auction" }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ className: 'form-label-auction' }, { children: "D\u00EDas de Subasta" })), (0, jsx_runtime_1.jsx)("input", { type: "number", className: "form-control", name: "auctionEndTime", placeholder: "D\u00EDas de Subasta", value: auctionDetails.auctionEndTime, onChange: handleInputChange })] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleAddProduct, className: "btn-auction mt-3" }, { children: "A\u00F1adir Producto" }))] }))) }))] })) })) })));
};
exports.default = AddAuction;
