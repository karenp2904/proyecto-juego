import * as React from 'react';
import background from '../../../../assets/dungeon-background.png'
import Button from '../../../shared/components/buttons/Button';

interface IModosDeJuegoProps {
}

const ModosDeJuego: React.FunctionComponent<IModosDeJuegoProps> = (props) => {
    
    return (
        <div
            className="bg-cover bg-center h-[calc(100vh-60px)] flex items-center justify-center pb-12" style={{ backgroundImage: `url(${background})` }}>
            <div className='bg-secundary backdrop-blur-lg px-6 py-4 rounded-lg shadow-xl h-[320px]'>
                <div className='w-full h-full mt-4 flex flex-col items-center justify-between'>
                    <h1 className='text-white font-semibold text-3xl'>Modos De Juego</h1>
                    <div className='h-full py-5 flex flex-col justify-evenly items-center'>
                    <Button name={'JUGADOR VS JUGADOR'} onClick={() => { }} />
                    <Button name={'JUGADOR VS MAQUINA'} onClick={() => { }} />
                    <Button name={'POR EQUIPOS'} onClick={() => { }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModosDeJuego;
