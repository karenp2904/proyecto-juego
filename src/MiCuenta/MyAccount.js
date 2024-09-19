"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./MyAccount.css");
const imgAvatar = '../../public/Images/usuario.png';
const MyAccount = () => {
    const [userData, setUserData] = (0, react_1.useState)({
        name: 'Nombre de ejemplo',
        surname: 'Apellido de ejemplo',
        nickname: 'ApodoEjemplo',
        email: 'ejemplo@correo.com',
        password: 'password',
        avatar: `${imgAvatar}`,
        securityQuestion1: 'Respuesta de ejemplo 1',
        securityQuestion2: 'Respuesta de ejemplo 2',
        securityQuestion3: 'Respuesta de ejemplo 3',
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(Object.assign(Object.assign({}, userData), { [name]: value }));
    };
    const handleAvatarChange = (e) => {
        var _a;
        const file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    setUserData(Object.assign(Object.assign({}, userData), { avatar: e.target.result }));
                }
            };
            reader.readAsDataURL(file);
        }
    };
    const handleUpdate = () => {
        // enviar datos actualizados.
        alert('Información actualizada con éxito.');
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "fondo2" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "account-container" }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "account-title" }, { children: "Mi Cuenta" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "avatar-section" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'cont-smallGroup' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "avatar-circle" }, { children: (0, jsx_runtime_1.jsx)("img", { src: userData.avatar, alt: "Avatar del usuario", className: "avatar-image" }) })), (0, jsx_runtime_1.jsx)("input", { type: "file", id: "avatarInput", className: "avatar-input", onChange: handleAvatarChange }), (0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "avatarInput", className: "avatar-label" }, { children: "Cambiar Avatar" }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "another-cont" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Apodo:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "nickname", value: userData.nickname, onChange: handleInputChange, className: "form-control" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Correo Electr\u00F3nico:" }), (0, jsx_runtime_1.jsx)("input", { type: "email", name: "email", value: userData.email, onChange: handleInputChange, className: "form-control" })] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "account-details" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'separete-item' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Nombre:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", value: userData.name, onChange: handleInputChange, className: "form-control" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Apellido:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "surname", value: userData.surname, onChange: handleInputChange, className: "form-control" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "separete-item" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Contrase\u00F1a:" }), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "password", value: userData.password, onChange: handleInputChange, className: "form-control" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Pregunta de Seguridad 1:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion1", value: userData.securityQuestion1, onChange: handleInputChange, className: "form-control" })] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "separete-item" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Pregunta de Seguridad 2:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion2", value: userData.securityQuestion2, onChange: handleInputChange, className: "form-control" })] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "detail-item" }, { children: [(0, jsx_runtime_1.jsx)("label", { children: "Pregunta de Seguridad 3:" }), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion3", value: userData.securityQuestion3, onChange: handleInputChange, className: "form-control" })] }))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "btn-update", onClick: handleUpdate }, { children: "Actualizar Informaci\u00F3n" }))] })) })));
};
exports.default = MyAccount;
