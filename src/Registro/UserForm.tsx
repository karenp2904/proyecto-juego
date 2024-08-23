import React, { useState } from 'react';
import './UserForm.css'; 

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

    
   
    const [avatarPreview, setAvatarPreview] = useState<string>('./Imagenes/imagenUserDefault.png');

    
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
        let isValid = true;

        // Validar que el nombre solo contenga letras
        if (!formData.name) {
            newErrors.name = 'El nombre es requerido.';
            isValid = false;
        } else if (!nameSurnameRegex.test(formData.name)) {
            newErrors.name = 'El nombre solo puede contener letras.';
            isValid = false;
        }

        // Validar que el apellido solo contenga letras
        if (!formData.surname) {
            newErrors.surname = 'El apellido es requerido.';
            isValid = false;
        } else if (!nameSurnameRegex.test(formData.surname)) {
            newErrors.surname = 'El apellido solo puede contener letras.';
            isValid = false;
        }

        // Validar que el apodo no esté en la lista existente
        if (!formData.nickname) {
            newErrors.nickname = 'El apodo es requerido.';
            isValid = false;
        } else if (existingNicknames.includes(formData.nickname.toLowerCase())) {
            newErrors.nickname = 'El apodo ya existe. Por favor, elija un apodo diferente.';
            isValid = false;
        }

        // Validar que el correo esté presente
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es requerido.';
            isValid = false;
        }

        // Validar que las contraseñas coincidan
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida.';
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden.';
            isValid = false;
        }

        // Validar que las preguntas de seguridad estén presentes
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
                        className={`form-control ${errors.name && 'input-error'}`} 
                        placeholder="Nombre" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                    />
                    {errors.name && <small className="error-text">{errors.name}</small>}

                    <input 
                        type="text" 
                        name="surname" 
                        className={`form-control ${errors.surname && 'input-error'}`} 
                        placeholder="Apellido" 
                        value={formData.surname} 
                        onChange={handleInputChange} 
                    />
                    {errors.surname && <small className="error-text">{errors.surname}</small>}

                    <input 
                        type="text" 
                        name="nickname" 
                        className={`form-control ${errors.nickname && 'input-error'}`} 
                        placeholder="Apodo" 
                        value={formData.nickname} 
                        onChange={handleInputChange} 
                    />
                    {errors.nickname && <small className="error-text">{errors.nickname}</small>}
                </div>

                <div className="form-group">
                    <input 
                        type="email" 
                        name="email" 
                        className={`form-control ${errors.email && 'input-error'}`} 
                        placeholder="Correo Electrónico" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                    />
                    {errors.email && <small className="error-text">{errors.email}</small>}

                    <input 
                        type="password" 
                        name="password" 
                        className={`form-control ${errors.password && 'input-error'}`} 
                        placeholder="Contraseña" 
                        value={formData.password} 
                        onChange={handleInputChange} 
                    />
                    {errors.password && <small className="error-text">{errors.password}</small>}

                    <input 
                        type="password" 
                        name="confirmPassword" 
                        className={`form-control ${errors.confirmPassword && 'input-error'}`} 
                        placeholder="Confirmar Contraseña" 
                        value={formData.confirmPassword} 
                        onChange={handleInputChange} 
                    />
                    {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}
                </div>
                
                <div className="avatar-upload">
                    <label htmlFor="avatarInput" className="avatar-label">
                        <div className="avatar-circle" >
                            <img id="avatarPreview" src={avatarPreview} alt="Elija Avatar" />
                        </div>
                        <input type="file" id="avatarInput" className="avatar-input" onChange={handleAvatarChange}  placeholder='ELIJA EL AVATAR'/>
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
                        />
                        {errors.securityQuestion1 && <small className="error-text">{errors.securityQuestion1}</small>}

                        <input 
                            type="text" 
                            name="securityQuestion2" 
                            className={`form-control ${errors.securityQuestion2 && 'input-error'}`} 
                            placeholder="¿En qué ciudad naciste?" 
                            value={formData.securityQuestion2} 
                            onChange={handleInputChange} 
                        />
                        {errors.securityQuestion2 && <small className="error-text">{errors.securityQuestion2}</small>}

                        <input 
                            type="text" 
                            name="securityQuestion3" 
                            className={`form-control ${errors.securityQuestion3 && 'input-error'}`} 
                            placeholder="¿Cuál fue el nombre de tu primera escuela?" 
                            value={formData.securityQuestion3} 
                            onChange={handleInputChange} 
                        />
                        {errors.securityQuestion3 && <small className="error-text">{errors.securityQuestion3}</small>}
                    </div>
                 
                    <div className='botonCont'>
                        <button type="submit" className="btn-register">REGISTRAR</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserForm;