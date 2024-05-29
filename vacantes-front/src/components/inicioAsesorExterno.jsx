import React, { useState } from 'react';
import { FaHome, FaUser, FaBuilding, FaFileAlt, FaChalkboardTeacher, FaChartLine, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import Perfil from './Perfil'; // Asegúrate de importar tu componente Perfil
import './inicioAsesorExterno.css';

const InicioAsesorExterno = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`inicio-asesor-externo ${collapsed ? 'collapsed' : ''}`}>
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <Link to="/inicioAsesorExterno">
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
            <Link to="/inicioAsesorExterno" className={location.pathname === '/inicioAsesorExterno' ? 'active' : ''}>
              <FaHome className="icon" />
              {!collapsed && <span className="menu-text">Inicio</span>}
            </Link>
          </li>
          <li>
            <Link to="perfil" className={location.pathname === '/inicioAsesorExterno/perfil' ? 'active' : ''}>
              <FaUser className="icon" />
              {!collapsed && <span className="menu-text">Perfil</span>}
            </Link>
          </li>
          <li>
            <Link to="documentos" className={location.pathname === '/inicioAsesorExterno/documentos' ? 'active' : ''}>
              <FaFileAlt className="icon" />
              {!collapsed && <span className="menu-text">Documentos</span>}
            </Link>
          </li>
          <li>
            <Link to="reporte" className={location.pathname === '/inicioAsesorExterno/reporte' ? 'active' : ''}>
              <FaChartLine className="icon" />
              {!collapsed && <span className="menu-text">Reporte</span>}
            </Link>
          </li>
          <li>
            <Link to="alumnos" className={location.pathname === '/inicioAsesorExterno/alumnos' ? 'active' : ''}>
              <FaChalkboardTeacher className="icon" />
              {!collapsed && <span className="menu-text">Alumnos</span>}
            </Link>
          </li>
          <li>
            <Link to="vacantes" className={location.pathname === '/inicioAsesorExterno/vacantes' ? 'active' : ''}>
              <FaBuilding className="icon" />
              {!collapsed && <span className="menu-text">Vacantes</span>}
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
        {user && user.type === 'asesorExterno' && <span>¡Hola {user.company}!</span>}
      </div>
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Resumen de prácticas profesionales</h1>} />
          <Route path="perfil" element={<Perfil />} />
          {/* Agrega aquí las rutas para las otras secciones */}
        </Routes>
      </div>
    </div>
  );
};

export default InicioAsesorExterno;
