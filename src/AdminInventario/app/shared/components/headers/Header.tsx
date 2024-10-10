import * as React from 'react';
import Button from '../buttons/Button';
import Avatar from '../avatar/Avatar';
import Searchbar from '../searchbar/Searchbar';
import { GiHamburgerMenu } from 'react-icons/gi'; // Importa el ícono de menú hamburguesa
import { MdClose } from 'react-icons/md'; // Ícono de cierre
import { useNavigate } from 'react-router-dom'; // Importar useNavigate


interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Button clicked', event.currentTarget);
  };

  const OpenMenu = () => {
    setIsMenuOpen(true);
  };

  const CloseMenu = () => {
    setIsMenuOpen(false);
  };

    // Función para manejar la navegación
    const handleNavigation = (path: string) => {
      navigate(path);
  };

  return (
    <div className='w-full px-3 py-3 bg-secundary flex flex-row justify-between items-center shadow-lg'>
      <Searchbar />
      
      {/* Menu hamburguesa para pantallas menores a `md` */}
      <button 
        className='lg:hidden flex items-center' 
        onClick={OpenMenu}
        aria-label="Toggle menu"
      >
        <GiHamburgerMenu className='w-6 h-6 text-white' />
        </button>

      {/* Menú de navegación para pantallas menores a `md` */}
      <div className={`z-50 fixed top-0 right-0 w-2/6 h-full shadow-2xl bg-primary p-4 lg:hidden transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row justify-end items-center'>
          <MdClose className='w-6 h-6 cursor-pointer' onClick={CloseMenu}/>
          </div>
          <Avatar name={'Ivan'}/>
          <Button name={'JUGAR ONLINE'} onClick={handleClick} type={undefined}/>
          <Button name={'TORNEO'} onClick={handleClick} type={undefined}/>
          <Button name={'SUBASTA'} onClick={handleClick} type={undefined}/>
          <Button name={'INVENTARIO'} onClick={() => handleNavigation('/admin/inventario')} type={undefined} />
        </div>
      </div>

      <div className='hidden lg:flex flex-row gap-3'>
        <Button name={'JUGAR ONLINE'} onClick={handleClick} type={undefined}/>
        <Button name={'TORNEO'} onClick={handleClick} type={undefined}/>
        <Button name={'SUBASTA'} onClick={handleClick} type={undefined}/>
        <Button name={'INVENTARIO'} onClick={() => handleNavigation('/admin/inventario')} type={undefined} />
        <Avatar name={'Ivan'}/>
      </div>
    </div>
  );
};

export default Header;
