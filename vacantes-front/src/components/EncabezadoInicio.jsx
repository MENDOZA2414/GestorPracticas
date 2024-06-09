import React from 'react';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Campana from './Campana';
import './encabezadoInicio.css';

const EncabezadoInicio = ({ user, userType, toggleSidebar, isCollapsed }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const getProfileLink = () => {
    switch (userType) {
      case 'alumno':
        return '/inicioAlumno/perfil';
      case 'asesorInterno':
        return '/inicioAsesorInterno/perfil';
      case 'asesorExterno':
        return '/inicioAsesorExterno/perfil';
      case 'entidadReceptora':
        return '/inicioEntidad/perfil';
      default:
        return '/inicioAlumno/perfil';
    }
  };

  return (
    <header className={`header-principal ${isCollapsed ? 'collapsed' : ''} sticky`}>
      <div className="header-principal-content">
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
          <Campana userType={userType} />
          {user && user.logo && (
            <Link to={getProfileLink()}>
              <img src={user.logo} alt="Profile" className="profile-picture" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default EncabezadoInicio;
