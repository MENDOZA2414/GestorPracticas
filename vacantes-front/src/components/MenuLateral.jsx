import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaBuilding, FaFileAlt, FaChalkboardTeacher, FaChartLine, FaSignOutAlt } from 'react-icons/fa';
import './menu.css'; 

const MenuLateral = ({ userType, logOut, collapsed, toggleSidebar }) => {
  const location = useLocation();

  const menuOptions = {
    alumno: [
      { path: '/inicioAlumno', icon: FaHome, label: 'Inicio' },
      { path: '/inicioAlumno/perfil', icon: FaUser, label: 'Perfil' },
      { path: '/inicioAlumno/vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: '/inicioAlumno/documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: '/inicioAlumno/asesor', icon: FaChalkboardTeacher, label: 'Asesor' },
      { path: '/inicioAlumno/avance', icon: FaChartLine, label: 'Avance' }
    ],
    entidadReceptora: [
      { path: '/inicioEntidad', icon: FaHome, label: 'Inicio' },
      { path: '/inicioEntidad/perfil', icon: FaUser, label: 'Perfil' },
      { path: '/inicioEntidad/vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: '/inicioEntidad/documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: '/inicioEntidad/reportes', icon: FaChartLine, label: 'Reportes' },
      { path: '/inicioEntidad/asesorExterno', icon: FaChalkboardTeacher, label: 'Asesor Externo' }
    ],
    asesorInterno: [
      { path: '/inicioAsesorInterno', icon: FaHome, label: 'Inicio' },
      { path: '/inicioAsesorInterno/perfil', icon: FaUser, label: 'Perfil' },
      { path: '/inicioAsesorInterno/entidades', icon: FaBuilding, label: 'Entidades' },
      { path: '/inicioAsesorInterno/vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: '/inicioAsesorInterno/documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: '/inicioAsesorInterno/alumnos', icon: FaUser, label: 'Alumnos' },
      { path: '/inicioAsesorInterno/reportes', icon: FaChartLine, label: 'Reportes' }
    ],
    asesorExterno: [
      { path: '/inicioAsesorExterno', icon: FaHome, label: 'Inicio' },
      { path: '/inicioAsesorExterno/perfil', icon: FaUser, label: 'Perfil' },
      { path: '/inicioAsesorExterno/vacantes', icon: FaBuilding, label: 'Vacantes' },
      { path: '/inicioAsesorExterno/documentos', icon: FaFileAlt, label: 'Documentos' },
      { path: '/inicioAsesorExterno/reportes', icon: FaChartLine, label: 'Reportes' }
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
            <Link to={option.path} title={option.label} className={location.pathname === option.path ? 'active' : ''}>
              <option.icon className="icon" />
              {!collapsed && <span className="menu-text">{option.label}</span>}
              {collapsed && <span className="tooltip">{option.label}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <Link to="/" onClick={logOut} title="Cerrar sesión" className={location.pathname === '/handleLogout' ? 'active' : ''}>
          <FaSignOutAlt className="icon logout-icon" />
          {!collapsed && <span className="menu-text">Cerrar sesión</span>}
          {collapsed && <span className="tooltip">Cerrar sesión</span>}
        </Link>
      </div>
    </div>
  );
};

export default MenuLateral;
