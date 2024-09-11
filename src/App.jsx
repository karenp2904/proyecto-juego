import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecoveryForm from './RecuperarCuenta/RecoveryForm.tsx';
import Register from './Registro/Register.tsx';
import Login from './InicioSesion/Login.tsx';
import MyAccount from './MiCuenta/MyAccount.tsx';
import Auction from './Subasta/Auction.tsx'
import AddAuction from './Subasta/SubastarProducto/AddAuction.tsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RecuperarCuenta" element={<RecoveryForm />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Usuario/MiCuenta" element={<MyAccount />} />
        <Route path="/Subasta" element={<Auction />} />
        <Route path="/Subasta/NuevoProducto" element={<AddAuction />} />
      </Routes>
    </Router>
  );
}

export default App;

// aqui puse las rutas para enlazar todas las paginas del usuario
