
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import background from "../assets/dungeon-background.png";
import flechaAtras2 from '../assets/flechaAtras2.png';
import Button from '../components/Button';
import "../styles/UnirseAPartida.css";
import { Router } from '../../Router/Router';

interface IUnirseaPartidaPageProps {}

const UnirseapartidaPage: React.FunctionComponent<IUnirseaPartidaPageProps> = (props) => {
  const navigate = useNavigate();

  const handleNavigateToCrearPartida = () => {
    navigate(Router.crearpartida);
  };

  const matchData = [
    { partida: "lolito's match", tipo: '1vs1', jugadores: '1/2', apuestas: 'Sí' },
    { partida: "Santipro's match", tipo: '1vs1', jugadores: '2/2', apuestas: 'No' },
    { partida: "juancarlosx match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
    // ... (resto de los datos de partidas)
  ];

  return (
    <div className="main-container" style={{ backgroundImage: `url(${background})` }}>
      <div className="content-wrapper">
        <div className="back-arrow">
          <img
            src={`/Images/${flechaAtras2}`}
            alt="Flecha Atrás"
            onClick={handleNavigateToCrearPartida}
          />
        </div>
        
        <h1 className="page-title">LISTA DE PARTIDAS</h1>
        
        <div className="table-container">
          <div className="table-header">
            <div className="header-row">
              <div>Partida</div>
              <div>Tipo partida</div>
              <div>Jugadores Restantes</div>
              <div>Apuestas</div>
              <div></div>
            </div>
          </div>
          
          <div className="table-body">
            {matchData.map((match, index) => (
              <div key={index} className="table-row">
                <div>{match.partida}</div>
                <div>{match.tipo}</div>
                <div>{match.jugadores}</div>
                <div>{match.apuestas}</div>
                <div>
                  <Button onClick={() => console.log(`Joining ${match.partida}`)}>
                    Unirse
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnirseapartidaPage;

