import * as React from 'react';
import background from '../../../../assets/dungeon-background.png';
import flechaAtras2 from '../../../../assets/flechaAtras2.png'; 
import Button from '../../../shared/components/buttons/Button';
import { useNavigate } from 'react-router-dom';

interface IUnirseaPartidaPageProps {}

const UnirseapartidaPage: React.FunctionComponent<IUnirseaPartidaPageProps> = (props) => {
    const navigate = useNavigate();

    const handleNavigateToCrearPartida = () => {
        navigate('/crearpartida');
    };

    const matchData = [
        { partida: "lolito's match", tipo: '1vs1', jugadores: '1/2', apuestas: 'Sí' },
        { partida: "Santipro's match", tipo: '1vs1', jugadores: '2/2', apuestas: 'No' },
        { partida: "juancarlosx match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        { partida: "nhdsaidsj match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        { partida: "lolito's match", tipo: '1vs1', jugadores: '1/2', apuestas: 'Sí' },
        { partida: "Santipro's match", tipo: '1vs1', jugadores: '2/2', apuestas: 'No' },
        { partida: "juancarlosx match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        { partida: "nhdsaidsj match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        { partida: "Santipro's match", tipo: '1vs1', jugadores: '2/2', apuestas: 'No' },
        { partida: "juancarlosx match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        { partida: "nhdsaidsj match", tipo: 'Por Equipos', jugadores: '3/6', apuestas: 'Sí' },
        // agregar datos para hacer las pruebas
    ];

    return (
        
        <div className="bg-cover bg-center h-[calc(100vh-60px)] flex flex-col items-center justify-center pb-12" style={{ backgroundImage: `url(${background})` }}>
            <div className="w-full max-w-4xl"> 

                {/* flecha atras */}
                <div className="absolute bottom-4 left-4"> 
                    <img 
                        src={flechaAtras2} 
                        alt="Flecha Atrás" 
                        className="cursor-pointer w-100 h-100"  
                        onClick={handleNavigateToCrearPartida} 
                    />
                </div>
 
                {/* Titulo */}
                <h1 className="text-3xl text-white font-bold mb-8 text-center">LISTA DE PARTIDAS</h1>

                {/* Table header */}
                <div className="bg-opacity-70 bg-gray-800 text-white py-2 px-4 rounded-t">
                    <div className="grid grid-cols-5 gap-4 text-center"> 
                        <div>Partida</div>
                        <div>Tipo partida</div>
                        <div>Jugadores Restantes</div>
                        <div>Apuestas</div>
                        <div></div> 
                    </div>
                </div>

                {/* Table body */}
                <div className="bg-opacity-70 bg-gray-900 text-white py-2 px-8 rounded-b">
                    {matchData.map((match, index) => (
                        <div key={index} className="grid grid-cols-5 gap-4 text-center py-1 border-b border-gray-700"> 
                            <div>{match.partida}</div>
                            <div>{match.tipo}</div>
                            <div>{match.jugadores}</div>
                            <div>{match.apuestas}</div>
                            <div>
                                <Button name="Unirse" onClick={() => console.log(`Joining ${match.partida}`)} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UnirseapartidaPage;


