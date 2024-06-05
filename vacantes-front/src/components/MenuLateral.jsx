import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBuilding, FaFileAlt, FaChalkboardTeacher, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import './menu.css'; 

const MenuLateral = ({ userType, logOut, collapsed, toggleSidebar }) => {
  const location = useLocation();

  const menuOptions = {
    alumno: [
      { path: '/inicioAlumno', icon: FaHome, label: 'Inicio' },
      { path: 'perfil', icon: FaUser, label: 'Perfil' },
      { path: 'vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: 'documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: 'asesor', icon: FaChalkboardTeacher, label: 'Asesor' },
      { path: 'avance', icon: FaChartLine, label: 'Avance' }
    ],
    entidadReceptora: [
      { path: '/inicioEntidad', icon: FaHome, label: 'Inicio' },
      { path: 'perfil', icon: FaUser, label: 'Perfil' },
      { path: 'vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: 'documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: 'reportes', icon: FaChartLine, label: 'Reportes' },
      { path: 'asesorExterno', icon: FaChalkboardTeacher, label: 'Asesor Externo' }
    ],
    asesorInterno: [
      { path: '/inicioAsesorInterno', icon: FaHome, label: 'Inicio' },
      { path: 'perfil', icon: FaUser, label: 'Perfil' },
      { path: 'entidades', icon: FaBuilding, label: 'Entidades' },
      { path: 'vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: 'documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: 'alumnos', icon: FaUser, label: 'Alumnos' },
      { path: 'reportes', icon: FaChartLine, label: 'Reportes' }
    ],
    asesorExterno: [
      { path: '/inicioAsesorExterno', icon: FaHome, label: 'Inicio' },
      { path: 'perfil', icon: FaUser, label: 'Perfil' },
      { path: 'vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: 'documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: 'reportes', icon: FaChartLine, label: 'Reportes' }
    ]
  };

  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to={menuOptions[userType][0].path}>
          <img
            src={collapsed ? "./../public/dasc_icon.png" : "./../public/dasc.png"}
            className="logo"
            alt="Logo"
          />
        </Link>
      </div>
      <ul className="menu-list">
        {menuOptions[userType].map((option) => (
          <li key={option.path}>
            <Link to={option.path} className={location.pathname === option.path ? 'active' : ''}>
              <option.icon className="icon" />
              {!collapsed && <span className="menu-text">{option.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <Link to="/" onClick={logOut} className={location.pathname === '/handleLogout' ? 'active' : ''}>
          <FaSignOutAlt className="icon logout-icon" />
          {!collapsed && <span className="menu-text">Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
};

export default MenuLateral;
