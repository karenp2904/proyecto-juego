import { FC } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import App from '../App';
import InventarioPage from '../pages/admin/inventario/InventarioPage';
import NotFoundPage from '../pages/common/NotFoundPage';
import { CrearArmaPage } from '../pages/admin/crearArma/CrearArmaPage';
import { CrearArmaduraPage } from '../pages/admin/crearArmadura/CrearArmaduraPage';
import { CrearItemPage } from '../pages/admin/crearItem/CrearItemPage';
import { CrearEpicaPage } from '../pages/admin/crearEpica/CrearEpicaPage';

import Lobby from '../pages/user/lobby/LobbyPage';
import AdminApp from '../AdminApp';
//import InventarioCrearProductoPage from '../pages/admin/inventarioCrearProducto/InventarioCrearProducto';
import CrearPartidaPage from '../pages/user/CrearPartida/CrearPartidaPage';
import ModosDeJuego from '../pages/user/ModosDeJuego/ModosDeJuegoPage';
import UnirseapartidaPage from '../pages/user/UnirseAPartidaCreada/UnirseAPartidaPage';
import { CrearHeroePage } from '../pages/admin/crearHeroe/CrearHeorePage';
import { EditarArma } from '../pages/admin/editarArma/EditarArma';

const baseurl = import.meta.env.BASE_URL;

const AppRoutes: FC = () => {

  return (
    <BrowserRouter basename={baseurl}>
      <Routes>
        <Route element={<App />}>
          <Route path='/lobby' element={<Lobby />} />
          <Route path='/crearpartida' element={<CrearPartidaPage />} />
          <Route path='/modosdejuego' element={<ModosDeJuego />} />
          <Route path='/unirseapartida' element={<UnirseapartidaPage />} />

          {/* Generales */}
          <Route path='*' element={<NotFoundPage />} />
        </Route>
        <Route element={<AdminApp />}>
          <Route path='/admin/inventario/editarArma/:id' element={<EditarArma />} />
          
          <Route path='/admin/inventario' element={<InventarioPage />} />

          <Route path='/admin/inventario/crearheroe' element={<CrearHeroePage />} /> //cambie la URL para que tenga sentido

          <Route path='/admin/inventario/creararma' element={<CrearArmaPage />} />

          <Route path='/admin/inventario/creararmadura' element={<CrearArmaduraPage />} />

          <Route path='/admin/inventario/crearitem' element={<CrearItemPage />} />

          <Route path='/admin/inventario/crearepica' element={<CrearEpicaPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export { AppRoutes }
