import React, { useState } from 'react';
import { FaHome, FaUser, FaFileAlt, FaChartLine, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Perfil from './Perfil'; // Asegúrate de importar tu componente Perfil
import DocumentosInterno from './DocumentosInterno'; // Importa el nuevo componente
import './inicioAsesorInterno.css';

const InicioAsesorInterno = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`inicio-asesor-interno ${collapsed ? 'collapsed' : ''}`}>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/inicioAsesorInterno">
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
            <Link to="/inicioAsesorInterno" className={location.pathname === '/inicioAsesorInterno' ? 'active' : ''}>
              <FaHome className="icon" />
              {!collapsed && <span className="menu-text">Inicio</span>}
            </Link>
          </li>
          <li>
            <Link to="perfil" className={location.pathname === '/inicioAsesorInterno/perfil' ? 'active' : ''}>
              <FaUser className="icon" />
              {!collapsed && <span className="menu-text">Perfil</span>}
            </Link>
          </li>
          <li>
            <Link to="vacantes" className={location.pathname === '/inicioAsesorInterno/vacantes' ? 'active' : ''}>
              <FaFileAlt className="icon" />
              {!collapsed && <span className="menu-text">Vacantes</span>}
            </Link>
          </li>
          <li>
            <Link to="documentos" className={location.pathname === '/inicioAsesorInterno/documentos' ? 'active' : ''}>
              <FaFileAlt className="icon" />
              {!collapsed && <span className="menu-text">Documentos</span>}
            </Link>
          </li>
          <li>
            <Link to="reportes" className={location.pathname === '/inicioAsesorInterno/reportes' ? 'active' : ''}>
              <FaChartLine className="icon" />
              {!collapsed && <span className="menu-text">Reportes</span>}
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
        {user && <span>¡Hola {user.company}!</span>}
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<div>Contenido de inicio</div>} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="documentos" element={<DocumentosInterno />} /> {/* Añade esta línea */}
          {/* Rutas adicionales aquí */}
        </Routes>
      </div>
    </div>
  );
};

export default InicioAsesorInterno;
