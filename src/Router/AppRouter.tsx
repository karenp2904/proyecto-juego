import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../InicioSesion/Login'; 
import AddAuction from '../Subasta/SubastarProducto/AddAuction';
import { Router } from './Router';
import Auction from '../Subasta/Auction';
import RecoveryForm from '../RecuperarCuenta/RecoveryForm';
import MyAccount from '../MiCuenta/MyAccount';
import Register from '../Registro/Register';
import Inicio from '../Index/Inicio';
import MainNavBar from '../NavBar/MainNavBar';


import CrearPartidaPage from '../Juego/components/CrearPartida';
import ModosDeJuego from '../Juego/components/ModosDejuego';
import UnirseapartidaPage from '../Juego/components/UnirseAPartida';
import InventarioBolsa from '../Juego/components/Inventario';
import Juego from '../Juego/Juego';
import Inventario from '../inventario/Inventario';
import UnoVsUno from '../Juego/components/UnoVsUno';

import InventarioPage from '../AdminInventario/app/pages/admin/inventario/InventarioPage';
import NotFoundPage from '../AdminInventario/app/pages/common/NotFoundPage';
import { CrearHeroePage } from '../AdminInventario/app/pages/admin/inventarioDetalle/CrearHeorePage';
import { CrearArmaPage } from '../AdminInventario/app/pages/admin/crearArma/CrearArmaPage';
import { CrearArmaduraPage } from '../AdminInventario/app/pages/admin/crearArmadura/CrearArmaduraPage';
import { CrearItemPage } from '../AdminInventario/app/pages/admin/crearItem/CrearItemPage';
import { CrearEpicaPage } from '../AdminInventario/app/pages/admin/crearEpica/CrearEpicaPage';
 import AdminApp from '../AdminInventario/app/AdminApp';
import Lobby from '../Juego/components/Lobby';

// import Lobby from '../AdminInventario/app/pages/user/lobby/LobbyPage';
// //import InventarioCrearProductoPage from '../pages/admin/inventarioCrearProducto/InventarioCrearProducto';
// import CrearPartidaPage from '../AdminInventario/app/pages/user/CrearPartida/CrearPartidaPage';
// import ModosDeJuego from '../AdminInventario/app/pages/user/ModosDeJuego/ModosDeJuegoPage';
// import UnirseapartidaPage from '../AdminInventario/app/pages/user/UnirseAPartidaCreada/UnirseAPartidaPage';



const AppRouter: FC = () => {
  const basename = process.env.REACT_APP_BASE_URL || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path={Router.login} element={<Login />} />
        <Route path="/" element={<Login />} />

        <Route path={Router.registro} element={<Register />} />

        <Route path={Router.recuperarCuenta} element={<RecoveryForm />} />
        <Route path={Router.inicio} element={<Inicio />} />

        <Route element={<MainNavBar />}>
          <Route path={Router.inicio} element={<Inicio />} />
          <Route path={Router.subasta} element={<Auction />} /> 
          <Route path={Router.subastarProducto} element={<AddAuction />} />    
          <Route path={Router.miCuenta} element={<MyAccount />} />
          <Route path={Router.juego} element={<Juego />} />
          <Route path={Router.inventario} element={<Inventario />} />


          <Route path={Router.bolsa} element={<InventarioBolsa />} />
          <Route path={Router.crearpartida} element={<CrearPartidaPage />} />
          <Route path={Router.modosdejuego} element={<ModosDeJuego />} />
         
          <Route path={Router.unirseapartida} element={<UnirseapartidaPage />} />
        </Route>

        <Route element={<AdminApp />}>
          <Route path={Router.adminInventario} element={<InventarioPage />} />
          
          <Route path='/admin/inventario/crearheroe' element={<CrearHeroePage />} /> //cambie la URL para que tenga sentido

          <Route path='/admin/inventario/creararma' element={<CrearArmaPage />} />

          <Route path='/admin/inventario/creararmadura' element={<CrearArmaduraPage />} />

          <Route path='/admin/inventario/crearitem' element={<CrearItemPage />} />

          <Route path='/admin/inventario/crearepica' element={<CrearEpicaPage />} />

        </Route>

       
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

/* <Route element={<App />}>
  
        <Route element={<NavBar />}>
         

        </Route>

          <Route path='/lobby' element={<Lobby />} />
          <Route path='/crearpartida' element={<CrearPartidaPage />} />
          <Route path='/modosdejuego' element={<ModosDeJuego />} />
          <Route path='/unirseapartida' element={<UnirseapartidaPage />} />

          {/* Generales 
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route element={<AdminApp />}>
          <Route path='/admin/inventario' element={<InventarioPage />} />
          
          <Route path='/admin/inventario/crearheroe' element={<CrearHeroePage />} /> //cambie la URL para que tenga sentido

          <Route path='/admin/inventario/creararma' element={<CrearArmaPage />} />

          <Route path='/admin/inventario/creararmadura' element={<CrearArmaduraPage />} />

          <Route path='/admin/inventario/crearitem' element={<CrearItemPage />} />

          <Route path='/admin/inventario/crearepica' element={<CrearEpicaPage />} />

        </Route>
      */
