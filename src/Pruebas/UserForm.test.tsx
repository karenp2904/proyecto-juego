// UserForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import UserForm from '../Registro/UserForm';

describe('UserForm Component', () => {
    test('renderiza el formulario correctamente', () => {
        render(<UserForm />);
        
        expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Apellido')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Apodo')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Correo Electrónico')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirmar Contraseña')).toBeInTheDocument();
    });

    test('muestra error si el nombre contiene caracteres no permitidos', () => {
        render(<UserForm />);
        
        const nameInput = screen.getByPlaceholderText('Nombre');
        fireEvent.change(nameInput, { target: { value: 'John123' } });

        fireEvent.blur(nameInput);

        expect(screen.getByText('El nombre solo puede contener letras.')).toBeInTheDocument();
    });

    test('muestra error si el apodo ya existe', () => {
        render(<UserForm />);
        
        const nicknameInput = screen.getByPlaceholderText('Apodo');
        fireEvent.change(nicknameInput, { target: { value: 'coolguy' } });

        fireEvent.blur(nicknameInput);

        expect(screen.getByText('El apodo ya existe. Por favor, elija un apodo diferente.')).toBeInTheDocument();
    });

    test('muestra error si las contraseñas no coinciden', () => {
        render(<UserForm />);
        
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');

        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password2!' } });

        fireEvent.blur(confirmPasswordInput);

        expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
    });

    test('muestra error si la contraseña no cumple con los requisitos de seguridad', () => {
        render(<UserForm />);
        
        const passwordInput = screen.getByPlaceholderText('Contraseña');

        fireEvent.change(passwordInput, { target: { value: 'password' } });

        fireEvent.blur(passwordInput);

        expect(screen.getByText('La contraseña debe tener al menos una letra mayúscula, un número y un carácter especial.')).toBeInTheDocument();
    });

    test('envía el formulario correctamente cuando todos los campos son válidos', () => {
        render(<UserForm />);
        
        const nameInput = screen.getByPlaceholderText('Nombre');
        const surnameInput = screen.getByPlaceholderText('Apellido');
        const nicknameInput = screen.getByPlaceholderText('Apodo');
        const emailInput = screen.getByPlaceholderText('Correo Electrónico');
        const passwordInput = screen.getByPlaceholderText('Contraseña');
        const confirmPasswordInput = screen.getByPlaceholderText('Confirmar Contraseña');
        const securityQuestion1Input = screen.getByPlaceholderText('¿Cuál es el nombre de tu primera mascota?');
        const securityQuestion2Input = screen.getByPlaceholderText('¿En qué ciudad naciste?');
        const securityQuestion3Input = screen.getByPlaceholderText('¿Cuál es tu color favorito?');

        fireEvent.change(nameInput, { target: { value: 'John' } });
        fireEvent.change(surnameInput, { target: { value: 'Doe' } });
        fireEvent.change(nicknameInput, { target: { value: 'newuser' } });
        fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'Password1!' } });
        fireEvent.change(confirmPasswordInput, { target: { value: 'Password1!' } });
        fireEvent.change(securityQuestion1Input, { target: { value: 'Fido' } });
        fireEvent.change(securityQuestion2Input, { target: { value: 'Bogotá' } });
        fireEvent.change(securityQuestion3Input, { target: { value: 'Azul' } });

        const submitButton = screen.getByText('REGISTRAR');
        fireEvent.click(submitButton);

        expect(screen.queryByText('El nombre es requerido.')).not.toBeInTheDocument();
        expect(screen.queryByText('El apellido es requerido.')).not.toBeInTheDocument();
        expect(screen.queryByText('El apodo es requerido.')).not.toBeInTheDocument();
        expect(screen.queryByText('El correo electrónico es requerido.')).not.toBeInTheDocument();
        expect(screen.queryByText('La contraseña es requerida.')).not.toBeInTheDocument();
        expect(screen.queryByText('Las contraseñas no coinciden.')).not.toBeInTheDocument();
        expect(screen.queryByText('Esta respuesta es requerida.')).not.toBeInTheDocument();
    });
});
