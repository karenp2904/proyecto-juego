import "./NavBar.css";
//import { Link } from 'react-router-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth, useUpdateUserCredits } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Router } from "../Router/Router";

export default function NavBar() {
  const user = useAuth((s) => s.user);
  useUpdateUserCredits();

  const navigate = useNavigate();

  function verificarUsuarioActivo() {
    if (user) {
      navigate(Router.miCuenta);
    } else {
      navigate(Router.login);
    }
  }

  const irSubasta = () => {
    navigate(Router.subasta);
  };
  const irjuego = () => {
    navigate(Router.crearpartida);
  };

  return (
    <nav className="NavBar">
      <div className="Container">
        <ul>
          
          <li>
            <a href="">Misiones</a>
          </li>
          <li>
            <a href="">Torneos</a>
          </li>
          <li>
            <a href="#" onClick={irjuego}>
              Jugar Online
            </a>
          </li>
          <li>
            <a href="#" onClick={irSubasta}>
              Subasta
            </a>
          </li>
          <li>
            <a href="/inventario" onClick={irSubasta}>
              Mi Inventario
            </a>
          </li>

          <form className="Busqueda">
            <input type="search" placeholder="Buscar..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="show-credits1">
            <span className="credits-user">
              {user?.credits}{" "}
              <img
                src={require("../assets/Images/icono-creditos.png")}
                alt="Moneda"
                className="coin-icon"
              />
            </span>
          </div>
          <img
            src={require("../assets/Images/userBar2.png")}
            className="img-navBar"
            alt="perfil"
            onClick={verificarUsuarioActivo}
          />
        </ul>
      </div>
    </nav>
  );
}
