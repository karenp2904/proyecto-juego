import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../InicioSesion/Login'; 
import AddAuction from '../Subasta/SubastarProducto/AddAuction';
import { Router } from './Router';
import Auction from '../Subasta/Auction';
import RecoveryForm from '../RecuperarCuenta/RecoveryForm';
import MyAccount from '../MiCuenta/MyAccount';
import Register from '../Registro/Register';

const AppRouter: FC = () => {
  const basename = process.env.REACT_APP_BASE_URL || '/';

  return (
    <BrowserRouter basename={basename}>
      <Routes>
   
        <Route path={Router.login} element={<Login />} />      
        <Route path={Router.subasta} element={<Auction />} />  
        <Route path={Router.subastarProducto} element={<AddAuction />} />    
        <Route path={Router.miCuenta} element={<MyAccount />} />   
        <Route path={Router.registro} element={<Register />} />   
        <Route path={Router.recuperarCuenta} element={<RecoveryForm />} />   


      </Routes>
    </BrowserRouter>
  );
};


export default AppRouter;
