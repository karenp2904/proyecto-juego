import * as React from 'react';
import Button from '../../../shared/components/buttons/Button';

interface ILobbyProps {
}

const Lobby: React.FunctionComponent<ILobbyProps> = (props) => {
  return (
    <div>
        <h1 className='text-white text-xl'>Este es el lobby</h1>
        <Button name={'PRUEBA'} onClick={function (event: React.MouseEvent<HTMLButtonElement>): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
};

export default Lobby;
