import './App.css'
//import { Link } from 'react-router-dom';

export default function App() {
    return (
        <nav className='NavBar'>
            <div className='Container'>
                    <ul>
                        <li><a href="InventarioAdmin.tsx">Jugar Online</a></li>
                        <li><a href="#">Misiones</a></li>
                        <li><a href="#">Torneos</a></li>
                        <li><a href="#">Subasta</a></li>
                        <li><a href="#">Mi Inventario</a></li>
                        <form className='Busqueda'>
                            <input type="search" placeholder='Buscar...' />
                            <button type='submit'>Buscar</button>
                        </form>
                    </ul>
            </div>
        </nav>
    );
};