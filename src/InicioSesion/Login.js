"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./Login.css");
function Login() {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación
        if (username === "" || password === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }
        //  llamada a una API para autenticar al usuario
        console.log("Username:", username);
        console.log("Password:", password);
        // Simulación
        alert("Inicio de sesión exitoso!");
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "fondo" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "login-container" }, { children: [(0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "logo-container" }, { children: [(0, jsx_runtime_1.jsx)("h1", Object.assign({ className: "INICIO" }, { children: "INICIO DE SESION" })), (0, jsx_runtime_1.jsx)("img", { className: "logo", src: "./Images/LOGO.PNG" })] })), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "username", className: "text" }, { children: "USUARIO / CORREO ELECTR\u00D3NICO " })), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "username", value: username, onChange: (e) => setUsername(e.target.value), required: true }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "password", className: "text" }, { children: "CONTRASE\u00D1A" })), (0, jsx_runtime_1.jsx)("input", { type: "password", id: "password", value: password, onChange: (e) => setPassword(e.target.value), required: true }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn-ingresar" }, { children: "INGRESAR" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "extra-links" }, { children: [(0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/RecuperarCuenta" }, { children: "\u00BFHas olvidado tu contrase\u00F1a? Recup\u00E9rala" })), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "/Registro" }, { children: "\u00BFNo est\u00E1s registrado? Reg\u00EDstrate" }))] }))] })) })));
}
exports.default = Login;
