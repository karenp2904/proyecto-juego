
import './NavBar.css'
//import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Router } from "../Router/Router";


export default function NavBar() {
    const user = useAuth(s => s.user);
    const navigate = useNavigate();

    function verificarUsuarioActivo(){

        if(user){
            navigate(Router.miCuenta)
        }else{
            navigate(Router.login)
        }
    }
    
    return (
        <nav className='NavBar'>
            <div className='Container'>
                    <ul>
                        <li><a href="InventarioAdmin.tsx">Jugar Online</a></li>
                        <li><a href="/">Misiones</a></li>
                        <li><a href="/">Torneos</a></li>
                        <li><a href="/">Subasta</a></li>
                        <li><a href="/">Mi Inventario</a></li>
                        <form className='Busqueda'>
                            <input type="search" placeholder='Buscar...' />
                            <button type='submit'>
                                <i className="fas fa-search"></i>
                            </button>
                        </form>

                        <div className="show-credits">
                            <span className="credits-user">
                                {100} <img src="./Images/icono-creditos.png" alt="Moneda" className="coin-icon" />
                            </span>                       
                        </div>
                        <img src="/Images/userBar2.png"  className='img-navBar' alt="perfil" onClick={verificarUsuarioActivo}/>

                    </ul>
            </div>
        </nav>
    );
};
