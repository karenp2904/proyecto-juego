import * as React from 'react';
import background from '../../../../assets/dungeon-background.png'
import Button from '../../../shared/components/buttons/Button';
import { useNavigate } from 'react-router-dom';

interface ICrearPartidaPageProps {
}

const CrearPartidaPage: React.FunctionComponent<ICrearPartidaPageProps> = (props) => {
    const navigate = useNavigate();

    const handleNavigateToCrearPartida= () => {
        navigate('/modosdejuego')
      };
      const handleNavigateToUnirseAPartida = () => {
        navigate('/unirseapartida');
    };
    return (
        <div
            className="bg-cover bg-center h-[calc(100vh-60px)] flex items-end justify-center pb-12" style={{ backgroundImage: `url(${background})` }}>
            <div className='flex flex-row w-full items-center justify-evenly'>
                <Button name={'CREAR PARTIDA'} onClick={handleNavigateToCrearPartida} />
                <Button name={'BUSCAR PARTIDA'} onClick={handleNavigateToUnirseAPartida} />
            </div>
        </div>
    );
};

export default CrearPartidaPage;
