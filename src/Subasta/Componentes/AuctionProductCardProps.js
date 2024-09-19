"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("./AuctionProductCard.css");
const AuctionProductCard = ({ id, name, imageUrl, currentBid, auctionEndTime, onBid, }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(auctionEndTime) - +new Date();
        let timeLeft = "";
        if (difference > 0) {
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);
            timeLeft = `${hours}h ${minutes}m ${seconds}s`;
        }
        else {
            // timeLeft = "Subasta finalizada";
            timeLeft = "2 dias";
        }
        return timeLeft;
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "auction-product-card" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "product-content " }, { children: [(0, jsx_runtime_1.jsx)("img", { src: `${imageUrl}`, alt: name, className: "product-image" }), (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "nombre", className: 'product-name' }, { children: [" ", `${name}`, " "] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "auction-details" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "bid-info" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "label" }, { children: "Oferta actual:" })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ className: "bid-credits" }, { children: [currentBid, " ", (0, jsx_runtime_1.jsx)("img", { src: "./Images/icono-creditos.png", alt: "Moneda", className: "coin-icon" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "time-info" }, { children: [(0, jsx_runtime_1.jsx)("span", Object.assign({ className: "label" }, { children: "Tiempo restante:" })), (0, jsx_runtime_1.jsx)("span", Object.assign({ className: "time-remaining" }, { children: calculateTimeLeft() }))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'btn-puja' }, { children: "PUJAR" }))] })) })));
};
exports.default = AuctionProductCard;
