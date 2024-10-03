import * as React from 'react';
import { MdDelete, MdEdit, MdRestoreFromTrash } from 'react-icons/md'; // Importa los íconos de caneca de basura y recuperar

interface ICardAdminInventarioProps {}

const CardAdminInventario: React.FunctionComponent<ICardAdminInventarioProps> = (props) => {
  const [isSuspended, setIsSuspended] = React.useState(false); // Estado para manejar el estado del botón

  const handleToggle = () => {
    setIsSuspended(!isSuspended); // Alterna el estado
    // Aquí puedes manejar la acción adicional que desees realizar cuando el estado cambie
    console.log(isSuspended ? 'Recovering' : 'Suspending');
  };

  return (
    <div className="h-full w-full bg-tertiary rounded-lg shadow-md transition-transform transform hover:scale-105">
      <div 
        className={`relative h-[60%] bg-cover bg-center rounded-t-lg bg-[url(https://i.pinimg.com/originals/12/9f/af/129faf8138feb18d2680ca3044bb3d13.jpg)]`}>
        <button 
          className={`absolute top-0 right-0 w-12 h-12 flex items-center justify-center rounded-md ${isSuspended ? 'bg-red-500 hover:bg-red-600': 'bg-red-500 hover:bg-red-600'} text-white`}
          onClick={handleToggle}
          aria-label={isSuspended ? 'Recover' : 'Suspend'}>
          {isSuspended ? <MdRestoreFromTrash className='w-6 h-6' /> : <MdDelete className='w-6 h-6' />}
        </button>
        <button 
          className="absolute top-0 left-0 w-12 h-12 flex items-center justify-center rounded-md text-white bg-blue-500 hover:bg-blue-600"
          onClick={()=>{}}
          aria-label={isSuspended ? 'Recover' : 'Suspend'}>
          <MdEdit className="w-6 h-6" />
        </button>
        <div className='w-full absolute bottom-0 text-white text-center flex flex-col items-center'>
          <div className='bg-opacity-50 backdrop-blur-md py-1 px-2 rounded-lg'>
          <span className='font-bold'>Mini Pekka</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAdminInventario;
