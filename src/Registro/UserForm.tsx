import React, { useState } from 'react';
import './UserForm.css'; 
import axios from 'axios';


const UserForm: React.FC = () => {
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
    });

     // Establecer la imagen de avatar predeterminada
     const defaultAvatar = '../../public/Images/usuario.png';
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

    const existingNicknames = ['coolguy', 'techmaster', 'codewizard', 'quicklearner', 'designguru', 'smartcookie', 'creativebee', 'logichacker', 'brightmind', 'sharpthinker'];

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
        } else if (!nameSurnameRegex.test(formData.name)) {
            newErrors.name = 'El nombre solo puede contener letras.';
            isValid = false;
        }

        if (!formData.surname) {
            newErrors.surname = 'El apellido es requerido.';
            isValid = false;
        } else if (!nameSurnameRegex.test(formData.surname)) {
            newErrors.surname = 'El apellido solo puede contener letras.';
            isValid = false;
        }

        if (!formData.nickname) {
            newErrors.nickname = 'El apodo es requerido.';
            isValid = false;
        } else if (existingNicknames.includes(formData.nickname.toLowerCase())) {
            newErrors.nickname = 'El apodo ya existe. Por favor, elija un apodo diferente.';
            isValid = false;
        }

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Por favor, introduzca un correo electrónico válido.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida.';
            isValid = false;
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'La contraseña debe tener al menos una letra mayúscula, un carácter especial, un número y una longitud mínima de 8 caracteres.';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulario enviado correctamente:', formData);
            axios.post( `http://127.0.0.1:3000/api/registro`, formData )
        }
    };

    return (
            <div className="form-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2 className="form-title">CREAR CUENTA NUEVA</h2>
                    </div>

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
                            type="text" 
                            name="nickname" 
                            className={`form-controlR ${errors.nickname && 'input-error'}`} 
                            placeholder="Apodo" 
                            value={formData.nickname} 
                            onChange={handleInputChange} 
                            required
                        />
                        {errors.nickname && <small className="error-text">{errors.nickname}</small>}
                    </div>

                    <div className="form-group">
                        
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
                        <div className='questionesInput'>
                            <h3 className="questions-title">PREGUNTAS DE SEGURIDAD</h3>

                            <input 
                                type="text" 
                                name="securityQuestion1" 
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
                <button className="return-button1" type="button" onClick={() => window.location.href = "/Login"}>
                        <img src="../../public/Images/atras.png" alt="volver" />
                </button>
            </div>
    );
};

export default UserForm;
