import React, { useState } from 'react';
import './RecoveryForm.css'; 



const RecoveryForm: React.FC = () => {
    const [answers, setAnswers] = useState({
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });

    const [errors, setErrors] = useState({
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value,
        });
        setErrors({
            ...errors,
            [e.target.name]: '',
        });
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Respuestas enviadas correctamente:', answers);
        }
    };

    return (
        <div className="fondo">
            <div className="recovery-container">
                <form className="recovery-form" onSubmit={handleSubmit}>
                    <h2 className="recovery-title">Recuperación de Cuenta</h2>
                    <div className="questionsInput">
                        <input
                            type="text"
                            name="securityQuestion1"
                            className={`form-control ${errors.securityQuestion1 && 'input-error'}`}
                            placeholder="¿Cuál es el nombre de tu primera mascota?"
                            value={answers.securityQuestion1}
                            onChange={handleInputChange}
                        />
                        {errors.securityQuestion1 && <small className="error-text">{errors.securityQuestion1}</small>}

                        <input
                            type="text"
                            name="securityQuestion2"
                            className={`form-control ${errors.securityQuestion2 && 'input-error'}`}
                            placeholder="¿En qué ciudad naciste?"
                            value={answers.securityQuestion2}
                            onChange={handleInputChange}
                        />
                        {errors.securityQuestion2 && <small className="error-text">{errors.securityQuestion2}</small>}

                        <input
                            type="text"
                            name="securityQuestion3"
                            className={`form-control ${errors.securityQuestion3 && 'input-error'}`}
                            placeholder="¿Cuál es tu color favorito?" 
                            value={answers.securityQuestion3}
                            onChange={handleInputChange}
                        />
                        {errors.securityQuestion3 && <small className="error-text">{errors.securityQuestion3}</small>}
                    </div>
                    <button type="submit" className="btn-recover">Recuperar Cuenta</button>
                    <button className="return-button" type="button" onClick={() => window.location.href = "/Login"}>
                        <img src="../../public/Images/atras.png" alt="volver" />
                    </button>

                </form>
              
               
            </div>
        </div>
    );
};

export default RecoveryForm;
