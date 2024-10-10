import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/dungeon-background.png"; //src/Juego/assets/dungeon-background.png
import Button from '../components/Button';
import "../styles/CrearPartida.css";
import { Router } from '../../Router/Router';

interface ICrearPartidaPageProps {}

const CrearPartidaPage: React.FunctionComponent<ICrearPartidaPageProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigateToCrearPartida= () => {
    navigate(Router.modosdejuego)
  };


  return (
    <div className="crear-partida-container" style={{ backgroundImage: `url(${background})` }}>
      <div className='button-container'>
        <Button onClick={handleNavigateToCrearPartida}>
          CREAR PARTIDA
        </Button>
      </div>
    </div>
  );
};

export default CrearPartidaPage;