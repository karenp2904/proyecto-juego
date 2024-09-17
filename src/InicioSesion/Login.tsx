import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  
  const auth = useAuth(s => s.auth);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevenir la recarga de la página
    event.preventDefault();

    try {
      // Validación de campos vacíos
      if (username === "" || password === "") {
        alert("Por favor, completa todos los campos.");
        return;
      }

      console.log("Username:", username);
      console.log("Password:", password);

      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        if (data.success) {
          localStorage.setItem("usuario", JSON.stringify(data.usuario));
          auth();

          const usuarioJSON = JSON.stringify(data.usuario);
          console.log('Información del usuario en JSON:', usuarioJSON);
        } else {
          console.error('Error en el inicio de sesión:', data.message);
        }
      } else {
        console.error('Error en la solicitud de inicio de sesión:', response.statusText);
      }

    } catch (error) {
      console.error('Error en la solicitud de inicio de sesión:', error);
    }
  };

  return (
    <div className="fondo">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <div className="logo-container">
            <h1 className="INICIO">INICIO DE SESIÓN</h1>
            <img className="logo" src="./Images/LOGO.PNG" alt="Logo" />
          </div>
          <label htmlFor="username" className="text">USUARIO / CORREO ELECTRÓNICO</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
      </div>
    </div>
  );
}

export default Login;
