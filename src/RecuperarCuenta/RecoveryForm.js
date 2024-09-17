"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
require("./RecoveryForm.css");
const RecoveryForm = () => {
    const [answers, setAnswers] = (0, react_1.useState)({
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });
    const [errors, setErrors] = (0, react_1.useState)({
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });
    const handleInputChange = (e) => {
        setAnswers(Object.assign(Object.assign({}, answers), { [e.target.name]: e.target.value }));
        setErrors(Object.assign(Object.assign({}, errors), { [e.target.name]: '' }));
    };
    const validateForm = () => {
        const newErrors = {
            securityQuestion1: '',
            securityQuestion2: '',
            securityQuestion3: '',
        };
        let isValid = true;
        // Validar que las preguntas de seguridad estén presentes
        if (!answers.securityQuestion1) {
            newErrors.securityQuestion1 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        if (!answers.securityQuestion2) {
            newErrors.securityQuestion2 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        if (!answers.securityQuestion3) {
            newErrors.securityQuestion3 = 'Esta respuesta es requerida.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Respuestas enviadas correctamente:', answers);
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", Object.assign({ className: "fondo" }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "recovery-container" }, { children: (0, jsx_runtime_1.jsxs)("form", Object.assign({ className: "recovery-form", onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("h2", Object.assign({ className: "recovery-title" }, { children: "Recuperaci\u00F3n de Cuenta" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "questionsInput" }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion1", className: `form-control ${errors.securityQuestion1 && 'input-error'}`, placeholder: "\u00BFCu\u00E1l es el nombre de tu primera mascota?", value: answers.securityQuestion1, onChange: handleInputChange }), errors.securityQuestion1 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion1 })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion2", className: `form-control ${errors.securityQuestion2 && 'input-error'}`, placeholder: "\u00BFEn qu\u00E9 ciudad naciste?", value: answers.securityQuestion2, onChange: handleInputChange }), errors.securityQuestion2 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion2 })), (0, jsx_runtime_1.jsx)("input", { type: "text", name: "securityQuestion3", className: `form-control ${errors.securityQuestion3 && 'input-error'}`, placeholder: "\u00BFCu\u00E1l es tu color favorito?", value: answers.securityQuestion3, onChange: handleInputChange }), errors.securityQuestion3 && (0, jsx_runtime_1.jsx)("small", Object.assign({ className: "error-text" }, { children: errors.securityQuestion3 }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", className: "btn-recover" }, { children: "Recuperar Cuenta" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "return-button", type: "button", onClick: () => window.location.href = "/Login" }, { children: (0, jsx_runtime_1.jsx)("img", { src: "./Images/atras.png", alt: "volver" }) }))] })) })) })));
};
exports.default = RecoveryForm;
