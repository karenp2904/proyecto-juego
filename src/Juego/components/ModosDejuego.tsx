import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/dungeon-background.png";
import Button from '../components/Button';
import "../styles/ModosDeJuego.css";
import { Router } from '../../Router/Router';

interface IModosDeJuegoProps {}

const ModosDeJuego: React.FunctionComponent<IModosDeJuegoProps> = (props) => {
  const navigate = useNavigate();

  const handleJugadorVsMaquina = () => {
    navigate(Router.lobby);
  };

  return (
    <div
      className="main-container"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='inner-container'>
        <div className='content-container'>
          <h1 className='heading'>Modos De Juego</h1>
          <div className='button-group'>
            <Button onClick={() => {}}>JUGADOR VS JUGADOR</Button>
            <Button onClick={handleJugadorVsMaquina}>JUGADOR VS MAQUINA</Button>
            <Button onClick={() => {}}>POR EQUIPOS</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModosDeJuego;