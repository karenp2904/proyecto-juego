"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./UserForm.css");
const axios_1 = __importDefault(require("axios"));
const UserForm = () => {
    const [formData, setFormData] = (0, react_1.useState)({
        name: '',
        surname: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });
    // Establecer la imagen de avatar predeterminada
    const defaultAvatar = '../../Images/usuario.png';
    const [avatarPreview, setAvatarPreview] = (0, react_1.useState)(defaultAvatar);
    const [errors, setErrors] = (0, react_1.useState)({
        name: '',
        surname: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });
    const existingNicknames = ['coolguy', 'techmaster', 'codewizard', 'quicklearner', 'designguru', 'smartcookie', 'creativebee', 'logichacker', 'brightmind', 'sharpthinker'];
    const handleInputChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
        setErrors(Object.assign(Object.assign({}, errors), { [e.target.name]: '' }));
    };
    const handleAvatarChange = (event) => {
        var _a;
        const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    setAvatarPreview(e.target.result);
                }
            };
            reader.readAsDataURL(file);
        }
        else {
            // Si no se selecciona un archivo, restablecer a la imagen predeterminada
            setAvatarPreview(defaultAvatar);
        }
    };
    const validateForm = () => {
        const newErrors = {
            name: '',
            surname: '',
            nickname: '',
            email: '',
            password: '',
            confirmPassword: '',
            securityQuestion1: '',
            securityQuestion2: '',
            securityQuestion3: '',
        };
        const nameSurnameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/; // Al menos una mayúscula, un carácter especial, un número y longitud mínima de 8
        let isValid = true;
        if (!formData.name) {
            newErrors.name = 'El nombre es requerido.';
            isValid = false;
        }
        else if (!nameSurnameRegex.test(formData.name)) {
            newErrors.name = 'El nombre solo puede contener letras.';
            isValid = false;
        }
        if (!formData.surname) {
            newErrors.surname = 'El apellido es requerido.';
            isValid = false;
        }
        else if (!nameSurnameRegex.test(formData.surname)) {
            newErrors.surname = 'El apellido solo puede contener letras.';
            isValid = false;
        }
        if (!formData.nickname) {
            newErrors.nickname = 'El apodo es requerido.';
            isValid = false;
        }
        else if (existingNicknames.includes(formData.nickname.toLowerCase())) {
            newErrors.nickname = 'El apodo ya existe. Por favor, elija un apodo diferente.';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
            isValid = false;
        }
        else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, introduzca un correo electrónico válido.';
            isValid = false;
        }
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida.';
            isValid = false;
        }
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos una letra mayúscula, un carácter especial, un número y una longitud mínima de 8 caracteres.';
            isValid = false;
        }
        else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }
        if (!formData.securityQuestion1) {
            newErrors.securityQuestion1 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        if (!formData.securityQuestion2) {
            newErrors.securityQuestion2 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        if (!formData.securityQuestion3) {
            newErrors.securityQuestion3 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulario enviado correctamente:', formData);
            axios_1.default.post(`http://127.0.0.1:3000/api/registro`, formData);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-container" }, { children: [(0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "register-form", onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "form-group" }, { children: (0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "form-title" }, { children: "CREAR CUENTA NUEVA" })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", name: "name", className: `form-controlR ${errors.name && 'input-error'}`, placeholder: "Nombre", value: formData.name, onChange: handleInputChange, required: true }), errors.name && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.name })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "surname", className: `form-controlR ${errors.surname && 'input-error'}`, placeholder: "Apellido", value: formData.surname, onChange: handleInputChange, required: true }), errors.surname && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.surname })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "nickname", className: `form-controlR ${errors.nickname && 'input-error'}`, placeholder: "Apodo", value: formData.nickname, onChange: handleInputChange, required: true }), errors.nickname && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.nickname }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "form-group" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "email", name: "email", className: `form-controlR ${errors.email && 'input-error'}`, placeholder: "Correo Electr\u00F3nico", value: formData.email, onChange: handleInputChange, required: true }), errors.email && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.email })), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "password", className: `form-controlR ${errors.password && 'input-error'}`, placeholder: "Contrase\u00F1a", value: formData.password, onChange: handleInputChange, required: true }), errors.password && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.password })), (0, jsx_runtime_1.jsx)("input", { type: "password", name: "confirmPassword", className: `form-controlR ${errors.confirmPassword && 'input-error'}`, placeholder: "Confirmar Contrase\u00F1a", value: formData.confirmPassword, onChange: handleInputChange, required: true }), errors.confirmPassword && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.confirmPassword }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "avatar-uploadR" }, { children: (0, jsx_runtime_1.jsxs)("label", Object.assign({ htmlFor: "avatarInput", className: "avatar-labelR" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "avatar-circleR" }, { children: (0, jsx_runtime_1.jsx)("img", { id: "avatarPreview", src: avatarPreview, alt: "Elija Avatar" }) })), (0, jsx_runtime_1.jsx)("input", { type: "file", id: "avatarInput", className: "avatar-inputR", onChange: handleAvatarChange, placeholder: 'ELIJA EL AVATAR' })] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "questions" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'questionesInput' }, { children: [(0, jsx_runtime_1.jsx)("h3", Object.assign({ className: "questions-title" }, { children: "PREGUNTAS DE SEGURIDAD" })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion1", className: `form-control ${errors.securityQuestion1 && 'input-error'}`, placeholder: "\u00BFCu\u00E1l es el nombre de tu primera mascota?", value: formData.securityQuestion1, onChange: handleInputChange, required: true }), errors.securityQuestion1 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion1 })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion2", className: `form-control ${errors.securityQuestion2 && 'input-error'}`, placeholder: "\u00BFEn qu\u00E9 ciudad naciste?", value: formData.securityQuestion2, onChange: handleInputChange, required: true }), errors.securityQuestion2 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion2 })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion3", className: `form-control ${errors.securityQuestion3 && 'input-error'}`, placeholder: "\u00BFCu\u00E1l es tu color favorito?", value: formData.securityQuestion3, onChange: handleInputChange, required: true }), errors.securityQuestion3 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion3 }))] })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'botonCont' }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn-register" }, { children: "REGISTRAR" })) }))] }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "return-button1", type: "button", onClick: () => window.location.href = "/Login" }, { children: (0, jsx_runtime_1.jsx)("img", { src: "./Images/atras.png", alt: "volver" }) }))] })));
};
exports.default = UserForm;
