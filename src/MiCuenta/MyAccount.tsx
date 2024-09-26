import React, { useState } from 'react';
import './MyAccount.css';

interface UserData {
  name: string;
  surname: string;
  nickname: string;
  email: string;
  password:string;
  avatar: string|undefined;
  securityQuestion1: string;
  securityQuestion2: string;
  securityQuestion3: string;
}
const imgAvatar='../../public/Images/usuario.png';

const MyAccount: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({
    name: 'Nombre de ejemplo',
    surname: 'Apellido de ejemplo',
    nickname: 'ApodoEjemplo',
    email: 'ejemplo@correo.com',
    password: 'password',
    avatar: `${imgAvatar}`, // `require` carga la image 
    securityQuestion1: 'Respuesta de ejemplo 1',
    securityQuestion2: 'Respuesta de ejemplo 2',
    securityQuestion3: 'Respuesta de ejemplo 3',
  });

  

  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target) {
          setUserData({ ...userData, avatar: e.target.result as string });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = () => {
    // enviar datos actualizados.
    alert('Información actualizada con éxito.');
  };

  return (
    <div className="fondo2">
      <div className="account-container">
        <h2 className="account-title">Mi Cuenta</h2>
        <div className="avatar-section">
          <div className='cont-smallGroup'>
            <div className="avatar-circle">
              <img src={userData.avatar} alt="Avatar del usuario" className="avatar-image" />
            </div>
            <input
              type="file"
              id="avatarInput"
              className="avatar-input"
              onChange={handleAvatarChange}
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
                  value={userData.nickname}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="detail-item">
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
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
                value={userData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="detail-item">
              <label>Apellido:</label>
              <input
                type="text"
                name="surname"
                value={userData.surname}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          


          <div className="separete-item">
            <div className="detail-item">
                <label>Contraseña:</label>
                <input
                  type="password"
                  name="password"
                  value={userData.password}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            <div className="detail-item">
              <label>Pregunta de Seguridad 1:</label>
              <input
                type="text"
                name="securityQuestion1"
                value={userData.securityQuestion1}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          <div className="separete-item">
            <div className="detail-item">
              <label>Pregunta de Seguridad 2:</label>
              <input
                type="text"
                name="securityQuestion2"
                value={userData.securityQuestion2}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="detail-item">
              <label>Pregunta de Seguridad 3:</label>
              <input
                type="text"
                name="securityQuestion3"
                value={userData.securityQuestion3}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
          </div>
          
        </div>
        <button className="btn-update" onClick={handleUpdate}>
          Actualizar Información
        </button>
      </div>
    </div>
    
  );
};

export default MyAccount;
