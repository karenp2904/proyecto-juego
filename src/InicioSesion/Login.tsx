import React, { useState } from "react";
import "./Login.css";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validación
    if (username === "" || password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    //  llamada a una API para autenticar al usuario
    console.log("Username:", username);
    console.log("Password:", password);

    // Simulación
    alert("Inicio de sesión exitoso!");
  };

  return (
    <div className="fondo">
      <div className="login-container">
            <form onSubmit={handleSubmit}>
              <div className="logo-container">
                <h1 className="INICIO">INICIO DE SESION</h1>
                <img className="logo" src="./Images/LOGO.PNG"></img>
                
              </div>
              <label htmlFor="username" className="text">USUARIO / CORREO ELECTRÓNICO </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="password" className="text" >CONTRASEÑA</label>
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
