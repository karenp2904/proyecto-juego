"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@testing-library/react");
//import '@testing-library/jest-dom/extend-expect';
require("@testing-library/jest-dom");
const UserForm_1 = __importDefault(require("../Registro/UserForm"));
describe('UserForm Component', () => {
    test('renderiza el formulario correctamente', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        expect(react_1.screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText('Apellido')).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText('Apodo')).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText('Correo Electrónico')).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(react_1.screen.getByPlaceholderText('Confirmar Contraseña')).toBeInTheDocument();
    });
    test('muestra error si el nombre contiene caracteres no permitidos', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        const nameInput = react_1.screen.getByPlaceholderText('Nombre');
        react_1.fireEvent.change(nameInput, { target: { value: 'John123' } });
        react_1.fireEvent.blur(nameInput);
        expect(react_1.screen.getByText('El nombre solo puede contener letras.')).toBeInTheDocument();
    });
    test('muestra error si el apodo ya existe', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        const nicknameInput = react_1.screen.getByPlaceholderText('Apodo');
        react_1.fireEvent.change(nicknameInput, { target: { value: 'coolguy' } });
        react_1.fireEvent.blur(nicknameInput);
        expect(react_1.screen.getByText('El apodo ya existe. Por favor, elija un apodo diferente.')).toBeInTheDocument();
    });
    test('muestra error si las contraseñas no coinciden', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        const passwordInput = react_1.screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = react_1.screen.getByPlaceholderText('Confirmar Contraseña');
        react_1.fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        react_1.fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });
        react_1.fireEvent.blur(confirmPasswordInput);
        expect(react_1.screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    });
    test('muestra error si la contraseña no cumple con los requisitos de seguridad', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        const passwordInput = react_1.screen.getByPlaceholderText('Contraseña');
        react_1.fireEvent.change(passwordInput, { target: { value: 'password' } });
        react_1.fireEvent.blur(passwordInput);
        expect(react_1.screen.getByText('La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.')).toBeInTheDocument();
    });
    test('envía el formulario correctamente cuando todos los campos son válidos', () => {
        (0, react_1.render)((0, jsx_runtime_1.jsx)(UserForm_1.default, {}));
        const nameInput = react_1.screen.getByPlaceholderText('Nombre');
        const surnameInput = react_1.screen.getByPlaceholderText('Apellido');
        const nicknameInput = react_1.screen.getByPlaceholderText('Apodo');
        const emailInput = react_1.screen.getByPlaceholderText('Correo Electrónico');
        const passwordInput = react_1.screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = react_1.screen.getByPlaceholderText('Confirmar Contraseña');
        const securityQuestion1Input = react_1.screen.getByPlaceholderText('¿Cuál es el nombre de tu primera mascota?');
        const securityQuestion2Input = react_1.screen.getByPlaceholderText('¿En qué ciudad naciste?');
        const securityQuestion3Input = react_1.screen.getByPlaceholderText('¿Cuál es tu color favorito?');
        react_1.fireEvent.change(nameInput, { target: { value: 'John' } });
        react_1.fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        react_1.fireEvent.change(nicknameInput, { target: { value: 'newuser' } });
        react_1.fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        react_1.fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        react_1.fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });
        react_1.fireEvent.change(securityQuestion1Input, { target: { value: 'Fido' } });
        react_1.fireEvent.change(securityQuestion2Input, { target: { value: 'Bogotá' } });
        react_1.fireEvent.change(securityQuestion3Input, { target: { value: 'Azul' } });
        const submitButton = react_1.screen.getByText('REGISTRAR');
        react_1.fireEvent.click(submitButton);
        expect(react_1.screen.queryByText('El nombre es requerido.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('El apellido es requerido.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('El apodo es requerido.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('El correo electrónico es requerido.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('La contraseña es requerida.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('Las contraseñas no coinciden.')).not.toBeInTheDocument();
        expect(react_1.screen.queryByText('Esta respuesta es requerida.')).not.toBeInTheDocument();
    });
});
