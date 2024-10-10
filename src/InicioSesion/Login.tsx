import "./Login.css";
import { useAuth } from "../hooks/useAuth";
import { Router } from "../Router/Router";
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Environment from "../shared/Environment";
import ConfirmationPanel from '../Subasta/Confirmacion/ConfirmationPanel';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage]= useState('');
  
  const navigate = useNavigate();
  const auth = useAuth(s => s.auth);
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevenir la recarga de la página
    event.preventDefault();
  
    try {
      // Validación de campos vacíos
      if (email === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
      }
  
  
      // Realizar una solicitud GET con Axios
      const response = await fetch(`${Environment.getDomain()}/api/auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password }),
      });
  
      if (response.ok) {
        const data = await response.json();

     
      

        if(data.usuario){

          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          auth();
          setCredits(data.usuario.iduser,200)
          if(data.usuario.surname=='admin' ||data.usuario.name=='Admin'){

            navigate(Router.adminInventario);
          }else{
            navigate(Router.inicio);

          }
  
          //const usuarioJSON = JSON.stringify(data.usuario);
          //console.log('Información del usuario en JSON:', usuarioJSON);
        
        } 
      } else {
        setConfirmationMessage('Las credenciales de su usuario no coinciden, intente de nuevo');
        setShowConfirmation(true)
        console.error('Error en la solicitud de inicio de sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  

  async function setCredits(idUser:number, credits:number){
    // Realizar una solicitud GET con Axios
    try {
        const response = await fetch(`${Environment.getDomain()}/api/setCredits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ iduser: idUser , credits:credits}),
        });
    
        if (response.ok) {
        console.log()
        return response.json()
    
        }else{
        return 0
        } 
    } catch (error) {
        // Captura errores de red o excepciones en la solicitud
        console.error('Error al realizar la solicitud:', error);
        return null;
    }
}

 

  return (
    <div className="fondo">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="logo-container">
            <h1 className="INICIO">INICIO DE SESIÓN</h1>
            <img className="logo" src={require("../assets/Images/logo.png")}  alt="Logo" /> 
          </div>
          <label htmlFor="username" className="text">USUARIO / CORREO ELECTRÓNICO</label>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password" className="text">CONTRASEÑA</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn-ingresar">INGRESAR</button>
        </form>
        <div className="extra-links">
          <a href="/RecuperarCuenta">¿Has olvidado tu contraseña? Recupérala</a>
          <a href="/Registro">¿No estás registrado? Regístrate</a>
        </div>


     
        {showConfirmation && (
          
            <ConfirmationPanel 
                type={`Credenciales incorrectas`} 
                message={confirmationMessage}
                onClose={() => setShowConfirmation(false)} // Cierra el panel
            />
           
        )}
      
        
      </div>

     
    </div>
  );
}

export default Login;
