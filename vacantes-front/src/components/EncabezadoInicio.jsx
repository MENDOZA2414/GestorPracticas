import React from 'react';
import { FaBars } from 'react-icons/fa';
import './encabezadoInicio.css'; 

const EncabezadoInicio = ({ user, toggleSidebar }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <header className="header-principal sticky">
      <div className="header-left">
        <FaBars className="menu-icon2" onClick={toggleSidebar} />
        <div className="user-info">
          {user && user.username && (
            <>
              <span className="user-greeting">¡Hola {user.username}!</span>
              <span className="current-date">{getCurrentDate()}</span>
            </>
          )}
        </div>
      </div>
      <div className="header-right">
        {user && user.logo && (
          <img src={user.logo} alt="Profile" className="profile-picture" />
        )}
      </div>
    </header>
  );
};

export default EncabezadoInicio;
