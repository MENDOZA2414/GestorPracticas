import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './encabezadoInicio.css';

const EncabezadoInicio = ({ user, toggleSidebar, isCollapsed }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <header className={`header-principal ${isCollapsed ? 'collapsed' : ''} sticky`}>
      <div className="header-principal-left">
        <FaBars className="menu-icon2 custom-bars-icon" onClick={toggleSidebar} />
        <div className="user-info2">
          {user && user.username && (
            <>
              <span className="user-greeting">¡Hola {user.username}!</span>
              <span className="current-date">{getCurrentDate()}</span>
            </>
          )}
        </div>
      </div>
      <div className="header-principal-right">
        {user && user.logo && (
          <Link to="/inicioAlumno/perfil">
            <img src={user.logo} alt="Profile" className="profile-picture" />
          </Link>
        )}
      </div>
    </header>
  );
};

export default EncabezadoInicio;
