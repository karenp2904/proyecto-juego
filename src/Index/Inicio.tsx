import "./Inicio.css"
import { Router } from "../Router/Router";
import { useNavigate } from "react-router-dom";
import React from 'react';



const Inicio: React.FC = () => {
  const navigate = useNavigate();

  function handleToGame(){
    navigate(Router.subasta)
  }

  return (
      <div className="overlay1">

          <div className="principal">
            <h1 className="titulo1">BIENVENIDO A</h1>
            <h1 className="titulo2">THE NEXUS BATTLE III</h1>
            <img className="logoInicio" src={'./Images/LOGO.png'} alt="Logo" />

            {/* Botón "Continuar" centrado bajo la imagen */}
            <button className="continuar" onClick={handleToGame}>J U G A R</button>
          </div>
      </div>
  );
}

export default Inicio;