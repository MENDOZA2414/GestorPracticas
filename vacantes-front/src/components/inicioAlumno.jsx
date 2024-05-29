import React, { useState } from 'react';
import { FaHome, FaUser, FaBuilding, FaFileAlt, FaChalkboardTeacher, FaChartLine, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import './inicioAlumno.css';

const InicioAlumno = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`inicio-alumno ${collapsed ? 'collapsed' : ''}`}>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/inicioAlumno">
            <img 
              src={collapsed ? "./../public/dasc_icon.png" : "./../public/dasc.png"} 
              className="logo" 
              alt="Logo" 
            />
          </Link>
          {!collapsed && <FaBars className="menu-icon" onClick={toggleSidebar} />}
        </div>
        {collapsed && <FaBars className="menu-icon" onClick={toggleSidebar} />}
        <ul className="menu-list">
          <li>
            <Link to="/inicioAlumno" className={location.pathname === '/inicioAlumno' ? 'active' : ''}>
              <FaHome className="icon" />
              {!collapsed && <span className="menu-text">Inicio</span>}
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={location.pathname === '/perfil' ? 'active' : ''}>
              <FaUser className="icon" />
              {!collapsed && <span className="menu-text">Perfil</span>}
            </Link>
          </li>
          <li>
            <Link to="/entidades" className={location.pathname === '/entidades' ? 'active' : ''}>
              <FaBuilding className="icon" />
              {!collapsed && <span className="menu-text">Entidades</span>}
            </Link>
          </li>
          <li>
            <Link to="/documentos" className={location.pathname === '/documentos' ? 'active' : ''}>
              <FaFileAlt className="icon" />
              {!collapsed && <span className="menu-text">Documentos</span>}
            </Link>
          </li>
          <li>
            <Link to="/asesor" className={location.pathname === '/asesor' ? 'active' : ''}>
              <FaChalkboardTeacher className="icon" />
              {!collapsed && <span className="menu-text">Asesor</span>}
            </Link>
          </li>
          <li>
            <Link to="/avance" className={location.pathname === '/avance' ? 'active' : ''}>
              <FaChartLine className="icon" />
              {!collapsed && <span className="menu-text">Avance</span>}
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/" className={location.pathname === '/logout' ? 'active' : ''}>
            <FaSignOutAlt className="icon logout-icon" />
            {!collapsed && <span className="menu-text">Cerrar sesión</span>}
          </Link>
        </div>
      </div>
      <div className={`header ${collapsed ? 'collapsed' : ''}`}>
        <span>Bienvenido a tu portal de gestión de prácticas.</span>
        <span>¡Hola Juan Pérez!</span>
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <h1>Resumen de practica profesional</h1>
      </div>
    </div>
  );
};

export default InicioAlumno;
