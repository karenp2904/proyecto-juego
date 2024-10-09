import React, { useState } from 'react';
import './MyAccount.css';
import { useAuth } from "../hooks/useAuth";
import User from '../types/User';
import { Router } from '../Router/Router';
import { useNavigate } from "react-router-dom";


const MyAccount: React.FC = () => {

  const imgAvatar=require('../assets/Images/usuario.png');
  const imgBoton=require('../assets/Images/atras.png');
  const user = useAuth(s => s.user);
  const navigate = useNavigate();


  

  const [userData, setUserData] = useState<User>();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  };





  const handleReturn = () => {
    navigate(Router.inicio)
  };

  return (
    <div className="fondo2">
      <div className="account-container">
        <div className='shared-cont'>
        <button className="return-button3" type="button" onClick={handleReturn}>
                      <img src={imgBoton} alt="volver" />
            </button>
            <h2 className="account-title">Mi Cuenta</h2>
        </div>
           

        <div className="avatar-section">
          <div className='cont-smallGroup'>
            <div className="avatar-circle">
              <img src={imgAvatar} alt="Avatar " className="avatar-image" />
            </div>
            <input
              type="file"
              id="avatarInput"
              className="avatar-input"
            />
            <label htmlFor="avatarInput" className="avatar-label">
              Cambiar Avatar
            </label>
          </div>
            <div className="another-cont">

            <div className="detail-item">
                <label>Apodo:</label>
                <input
                  type="text"
                  name="nickname"
                  value={user?.nickname}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="detail-item">
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={user?.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
          

        <div className="account-details">
          <div className='separete-item'>

            <div className="detail-item">
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={user?.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>


            <div className="detail-item">
              <label>Apellido:</label>
              <input
                type="text"
                name="surname"
                value={user?.surname}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="detail-item">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={user?.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
            </div>


           
           
          </div>
          


          <div className="separete-item">
              <div className="detail-item">
                  <label>Pregunta de Seguridad 1:</label>
                  <input
                    type="text"
                    name="securityQuestion1"
                    value={user?.securityquestion1}
                    onChange={handleInputChange}
                    className="form-control"
                  />
              </div>

              <div className="detail-item">
                <label>Pregunta de Seguridad 2:</label>
                <input
                  type="text"
                  name="securityQuestion2"
                  value={user?.securityquestion2}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="detail-item">
                <label>Pregunta de Seguridad 3:</label>
                <input
                  type="text"
                  name="securityQuestion3"
                  value={user?.securityquestion3}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
           
          </div>
        </div>
        
      </div>
    </div>
    
  );
};

export default MyAccount;
