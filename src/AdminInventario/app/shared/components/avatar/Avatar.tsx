import * as React from 'react';
import logo from '../../../../assets/react.svg'; // Importa el archivo SVG


interface IAvatarProps {
    name:string;
}

const Avatar: React.FunctionComponent<IAvatarProps> = (props) => {
  return (
    <div className='h-full w-auto bg-secundary rounded-lg flex flex-row justify-center items-center p-2 gap-2'>
        <img src={logo} alt="Logo" />
        <span className=' text-center text-white'>{props.name}</span>
    </div>
  );
};

export default Avatar;
