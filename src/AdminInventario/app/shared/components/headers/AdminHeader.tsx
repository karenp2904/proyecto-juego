import * as React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate
import Button from '../buttons/Button';
import Searchbar from '../searchbar/Searchbar';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdClose } from 'react-icons/md';

interface IAdminHeaderProps {}

const AdminHeader: React.FunctionComponent<IAdminHeaderProps> = ({}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate(); // Inicializar el hook de navegación

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
        <div className='w-full px-3 py-3 bg-primary flex flex-row justify-between items-center shadow-xl'>
            <Searchbar />

            {/* Menu hamburguesa para pantallas menores a `md` */}
            <button
                className='xl:hidden flex items-center'
                onClick={OpenMenu}
                aria-label="Toggle menu"
            >
                <GiHamburgerMenu className='w-6 h-6 text-white' />
            </button>

            {/* Menú de navegación para pantallas menores a `md` */}
            <div className={`z-50 fixed top-0 right-0 w-2/6 h-full shadow-2xl bg-primary p-4 xl:hidden transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row justify-end items-center'>
                        <MdClose className='w-6 h-6 cursor-pointer' onClick={CloseMenu} />
                    </div>
                    <Button name={'INVENTARIO'} onClick={() => handleNavigation('/admin/inventario')} />
                    <Button name={'CREAR HEROE'} onClick={() => handleNavigation('/admin/inventario/crearheroe')} />
                    <Button name={'CREAR ARMA'} onClick={() => handleNavigation('/admin/inventario/creararma')} />
                    <Button name={'CREAR ARMADURA'} onClick={() => handleNavigation('/admin/inventario/creararmadura')} />
                    <Button name={'CREAR ITEM'} onClick={() => handleNavigation('/admin/inventario/crearitem')} />
                    <Button name={'CREAR EPICA'} onClick={() => handleNavigation('/admin/inventario/crearepica')} />
                </div>
            </div>

            <div className='hidden xl:flex flex-row gap-3'>
                <Button name={'INVENTARIO'} onClick={() => handleNavigation('/admin/inventario')} />
                <Button name={'CREAR HEROE'} onClick={() => handleNavigation('/admin/inventario/crearheroe')} />
                <Button name={'CREAR ARMA'} onClick={() => handleNavigation('/admin/inventario/creararma')} />
                <Button name={'CREAR ARMADURA'} onClick={() => handleNavigation('/admin/inventario/creararmadura')} />
                <Button name={'CREAR ITEM'} onClick={() => handleNavigation('/admin/inventario/crearitem')} />
                <Button name={'CREAR EPICA'} onClick={() => handleNavigation('/admin/inventario/crearepica')} />
            </div>
        </div>
    );
};

export default AdminHeader;

