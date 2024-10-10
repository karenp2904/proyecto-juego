import React, { useState } from 'react';
import './UserForm.css'; 
import axios from 'axios';
import { Router } from "../Router/Router";
import { useNavigate } from "react-router-dom";
import Environment from "../shared/Environment";

const UserForm: React.FC = () => {

    
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
        credits:0,
    });

     // Establecer la imagen de avatar predeterminada
     const defaultAvatar = '../../Images/usuario.png';
     const [avatarPreview, setAvatarPreview] = useState<string>(defaultAvatar);
 

    const [errors, setErrors] = useState({
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

    const existingNicknames = [
        'coolguy', 'techmaster', 'codewizard', 'quicklearner', 'designguru', 'smartcookie', 
        'creativebee', 'logichacker', 'brightmind', 'sharpthinker',
    ];
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
    };

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (e.target) {
                    setAvatarPreview(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        } else {
            // Si no se selecciona un archivo, restablecer a la imagen predeterminada
            setAvatarPreview(defaultAvatar);
        }
    };

    const containsInvalidTerms = (nickname: string) => {
        const forbiddenWords = [
            // Groserías colombianas
            'hijueputa', 'gonorrea', 'carechimba', 'marica', 'pendejo', 'guevon', 'mamon', 'pirobo', 'culicagao', 'zorra',
            'caremondá', 'culicagado', 'malparido', 'careverga', 'chimba', 'verraco', 'cojudo', 'careculo', 'careguevo',
            'perra', 'puto', 'ñero', 'guevón','guevon', 'wevon', 'imbecil', 'estúpido', 'maldito', 'hp', 'mk', 'jueputa','sapo', 'bigdick',
            'dick','pussy','gay', 'gays','sapo perro','manacido','loparieroncagando','homosexual','malparida','gordo','gordofobico',
            'gayelquelolea', 'gay el que lo lea', 'como', 'ojo que te cojo','sapa', 'puta','monda',
            // Groserías y términos ofensivos de otros países de Latinoamérica
            'chingado', 'culero', 'verga', 'boludo', 'pelotudo', 'pajero', 'cabrón', 'pendeja', 'culiao', 'gilipollas', 
            'mierda', 'carajo', 'cabronazo', 'putazo', 'forro', 'tarado', 'baboso', 'mequetrefe', 'mamaguevo', 'coño', 
            'carapicha', 'maldito', 'destroyerpussy','triplehijueputa','tripplejueputa','triplehp',

            'mrda',  'tetranutra','pito', 'piroba',  'carepicha','monda', 'culo',  'cuca','pitudo', 'paraco',  'nigga','mierda',
    
            // Nombres de celebridades
            'shakira', 'maluma', 'jbalvin', 'messi', 'cristiano', 'badbunny', 'thalia', 'ricky', 'daddyyankee', 'jlo', 
            'sofiavergara', 'karolg', 'camilo', 'luisfonsi', 'beckham', 'kardashian', 'kendall', 'kanye', 'rihanna', 
            'beyonce', 'drake',
    
            // Nombres de políticos
            'uribe', 'juan manuel santos','Juan Mauel Santo','santos', 'gustavo petro','petro', 'maduro', 'chavez', 'duque', 'obama', 'trump', 'biden', 'pinochet', 'castro', 
            'bolsonaro', 'lula', 'fernandez', 'kirchner', 'boric', 'ortega', 'morales', 'lopezobrador', 'guzman',
    
           
        ];
    
        // Verifica si el apodo contiene alguna de las palabras prohibidas
        return forbiddenWords.some(word => nickname.toLowerCase().includes(word));
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

        const trimmedName = formData.name.replace(/\s+/g, ''); // Elimina todos los espacios
        const trimmedSurname = formData.name.replace(/\s+/g, ''); // Elimina todos los espacios

        let isValid = true;

        if (!formData.name) {
            newErrors.name = 'El nombre es requerido.';
            isValid = false;
        } else if (!nameSurnameRegex.test(trimmedName)) {
            newErrors.name = 'El nombre solo puede contener letras.';
            isValid = false;
        }else if (containsInvalidTerms(formData.name)) {
            newErrors.name = 'El nombre contiene términos no permitidos.';
            isValid = false;
        }

        if (!formData.surname) {
            newErrors.surname = 'El apellido es requerido.';
            isValid = false;
        } else if (!nameSurnameRegex.test(trimmedSurname)) {
            newErrors.surname = 'El apellido solo puede contener letras.';
            isValid = false;
        }else if (containsInvalidTerms(formData.surname)) {
            newErrors.surname = 'El apellido contiene términos no permitidos.';
            isValid = false;
        }

        if (!formData.nickname) {
            newErrors.nickname = 'El apodo es requerido.';
            isValid = false;
        } else if (existingNicknames.includes(formData.nickname.toLowerCase())) {
            newErrors.nickname = 'El apodo ya existe o no es válido. Por favor, elija uno diferente.';
            isValid = false;
        } else if (containsInvalidTerms(formData.nickname)) {
            newErrors.nickname = 'El apodo contiene términos no permitidos.';
            isValid = false;
        }
        

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'El correo electrónico no es válido.';
            isValid = false;
        }else if (containsInvalidTerms(formData.email)) {
            newErrors.email = 'Contiene términos no permitidos.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida.';
            isValid = false;
        } else if ((!passwordRegex.test(formData.password)) || ( !passwordRegex.test(formData.confirmPassword))) {
            newErrors.password = 'La contraseña no es valida.';
            
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        if (!formData.securityQuestion1) {
            newErrors.securityQuestion1 = 'Esta respuesta es requerida.';
            isValid = false;
        }else if (containsInvalidTerms(formData.securityQuestion1)) {
            newErrors.securityQuestion1 = 'Contiene términos no permitidos.';
            isValid = false;
        }
        if (!formData.securityQuestion2) {
            newErrors.securityQuestion2 = 'Esta respuesta es requerida.';
            isValid = false;
        }else if (containsInvalidTerms(formData.securityQuestion2)) {
            newErrors.securityQuestion2 = 'Contiene términos no permitidos.';
            isValid = false;
        }
        if (!formData.securityQuestion3) {
            newErrors.securityQuestion3 = 'Esta respuesta es requerida.';
            isValid = false;
        }else if (containsInvalidTerms(formData.securityQuestion3)) {
            newErrors.securityQuestion3 = 'Contiene términos no permitidos.';
            isValid = false;
        }


        setErrors(newErrors);
        return isValid;
    };

    const handleToLogin = ()=>{
        navigate(Router.login)
    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Verifica si el formulario pasa la validación
        if (!validateForm()) {
            return;
        }
    
        try {
            const response = await axios.post(`${Environment.getDomain()}/api/registro`, formData);
    
            // Si la solicitud es exitosa, redirige al usuario al login
            if (response.status === 201 || response.status==200) {  // Puedes ajustar el código de estado según lo devuelto por tu API
                handleToLogin();
            } else {
                console.error('Error en el registro:', response.data);
                alert('Hubo un problema con el registro. Inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
            alert('No se pudo completar el registro. Por favor, revise su conexión y vuelva a intentarlo.');
        }
    };
    

    return (
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                   
                    <h2 className="form-title">CREAR CUENTA NUEVA</h2>
                    

                    <div className="form-group">
                        
                        <input 
                            type="text" 
                            name="name" 
                            className={`form-controlR ${errors.name && 'input-error'}`} 
                            placeholder="Nombre" 
                            value={formData.name} 
                            onChange={handleInputChange} 
                            required
                        />
                        {errors.name && <small className="error-text">{errors.name}</small>}
                        
                        <input 
                            type="email" 
                            name="email" 
                            className={`form-controlR ${errors.email && 'input-error'}`} 
                            placeholder="Correo Electrónico" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required
                        />
                        {errors.email && <small className="error-text">{errors.email}</small>}
                        
    
                    </div>

                    <div className="form-group">
                        <input 
                                type="text" 
                                name="surname" 
                                className={`form-controlR ${errors.surname && 'input-error'}`} 
                                placeholder="Apellido" 
                                value={formData.surname} 
                                onChange={handleInputChange} 
                                required
                            />
                            {errors.surname && <small className="error-text">{errors.surname}</small>}
                            
                            
                        <input 
                            type="password" 
                            name="password" 
                            className={`form-controlR ${errors.password && 'input-error'}`} 
                            placeholder="Contraseña" 
                            value={formData.password} 
                            onChange={handleInputChange} 
                            required
                        />
                        {errors.password && <small className="error-text">{errors.password}</small>}
                            
                            
                    </div>

                    <div className="form-group">
                        
                        <input 
                                    type="text" 
                                    name="nickname" 
                                    className={`form-controlR ${errors.nickname && 'input-error'}`} 
                                    placeholder="Apodo" 
                                    value={formData.nickname} 
                                    onChange={handleInputChange} 
                                    required
                                />
                        {errors.nickname && <small className="error-text">{errors.nickname}</small>}

                        
                        <input 
                            type="password" 
                            name="confirmPassword" 
                            className={`form-controlR ${errors.confirmPassword && 'input-error'}`} 
                            placeholder="Confirmar Contraseña" 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange} 
                            required
                        />
                        {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}

                    </div>
                    
                    <div className="avatar-uploadR">
                        <label htmlFor="avatarInput" className="avatar-labelR">
                            <div className="avatar-circleR">
                                <img id="avatarPreview" src={avatarPreview} alt="Elija Avatar" />
                            </div>
                            <input type="file" id="avatarInput" className="avatar-inputR" onChange={handleAvatarChange} placeholder='ELIJA EL AVATAR'/>
                        </label>
                    </div>
                    
                    <div className="questions">
                        <div className='questionsInput'>
                            <h3 className="questions-title">PREGUNTAS DE SEGURIDAD</h3>

                            <input 
                                type="text" 
                                name="securityQuestion1" 
                                id='form-questions1'
                                className={`form-control ${errors.securityQuestion1 && 'input-error'}`} 
                                placeholder="¿Cuál es el nombre de tu primera mascota?" 
                                value={formData.securityQuestion1} 
                                onChange={handleInputChange} 
                                required
                            />
                          
                            {errors.securityQuestion1 && <small className="error-text">{errors.securityQuestion1}</small>}

                            <input 
                                type="text" 
                                name="securityQuestion2" 
                                id='form-questions2'
                                className={`form-control ${errors.securityQuestion2 && 'input-error'}`} 
                                placeholder="¿En qué ciudad naciste?" 
                                value={formData.securityQuestion2} 
                                onChange={handleInputChange} 
                                required
                            />
                            {errors.securityQuestion2 && <small className="error-text">{errors.securityQuestion2}</small>}

                            <input 
                                type="text" 
                                name="securityQuestion3" 
                                id='form-questions3'
                                className={`form-control ${errors.securityQuestion3 && 'input-error'}`} 
                                placeholder="¿Cuál es tu color favorito?" 
                                value={formData.securityQuestion3} 
                                onChange={handleInputChange} 
                                required
                            />
                            {errors.securityQuestion3 && <small className="error-text">{errors.securityQuestion3}</small>}
                        </div>
                    
                        <div className='botonCont'>
                            <button type="submit" className="btn-register">REGISTRAR</button>
                        </div>
                    </div>
                </form>
                <button className="return-button1" type="button" onClick={handleToLogin}>
                        <img src="./Images/atras.png" alt="volver" />
                </button>
            </div>
    );
};

export default UserForm;
