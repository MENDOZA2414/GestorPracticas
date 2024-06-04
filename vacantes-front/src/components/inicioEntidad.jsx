import React, { useState } from 'react';
import { FaHome, FaUser, FaFileAlt, FaChartLine, FaBuilding, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Perfil from './Perfil'; // Asegúrate de importar tu componente Perfil
import './inicioEntidad.css';

const InicioEntidad = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`inicio-entidad ${collapsed ? 'collapsed' : ''}`}>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/inicioEntidad">
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
            <Link to="/inicioEntidad" className={location.pathname === '/inicioEntidad' ? 'active' : ''}>
              <FaHome className="icon" />
              {!collapsed && <span className="menu-text">Inicio</span>}
            </Link>
          </li>
          <li>
            <Link to="perfil" className={location.pathname === '/inicioEntidad/perfil' ? 'active' : ''}>
              <FaUser className="icon" />
              {!collapsed && <span className="menu-text">Perfil</span>}
            </Link>
          </li>
          <li>
            <Link to="vacantes" className={location.pathname === '/inicioEntidad/vacantes' ? 'active' : ''}>
              <FaBuilding className="icon" />
              {!collapsed && <span className="menu-text">Vacantes</span>}
            </Link>
          </li>
          <li>
            <Link to="documentos" className={location.pathname === '/inicioEntidad/documentos' ? 'active' : ''}>
              <FaFileAlt className="icon" />
              {!collapsed && <span className="menu-text">Documentos</span>}
            </Link>
          </li>
          <li>
            <Link to="reportes" className={location.pathname === '/inicioEntidad/reportes' ? 'active' : ''}>
              <FaChartLine className="icon" />
              {!collapsed && <span className="menu-text">Reportes</span>}
            </Link>
          </li>
          <li>
            <Link to="asesorExterno" className={location.pathname === '/inicioEntidad/asesorExterno' ? 'active' : ''}>
              <FaUser className="icon" />
              {!collapsed && <span className="menu-text">Asesor Externo</span>}
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <Link to="/" onClick={logOut} className={location.pathname === '/handleLogout' ? 'active' : ''}>
            <FaSignOutAlt className="icon logout-icon" />
            {!collapsed && <span className="menu-text">Cerrar sesión</span>}
          </Link>
        </div>
      </div>
      <div className={`header ${collapsed ? 'collapsed' : ''}`}>
        <span>Bienvenido a tu portal de gestión de prácticas.</span>
        {user && <span>¡Hola {user.username}!</span>}
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Resumen de la entidad</h1>} />
          <Route path="perfil" element={<Perfil />} />
          {/* Agrega aquí las rutas para las otras secciones */}
        </Routes>
      </div>
    </div>
  );
};

export default InicioEntidad;
