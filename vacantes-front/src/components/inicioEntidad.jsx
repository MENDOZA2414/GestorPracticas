import React, { useState, useEffect } from 'react';
import { FaHome, FaUser, FaFileAlt, FaChartLine, FaBuilding, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import axios from 'axios';
import PerfilEntidadReceptora from './PerfilEntidadReceptora';
import Documentos from './Documentos';
import Vacantes from './Vacantes';
import EncabezadoInicio from './EncabezadoInicio';
import MenuLateral from './MenuLateral';
import RegistrarAsesorExterno from './RegistrarAsesorExterno'; // Importa el componente de registro de asesor
import './inicioEntidad.css';

const InicioEntidad = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          const response = await axios.get(`http://localhost:3001/entidadReceptora/${storedUser.id}`);
          const userData = response.data;
          userData.foto = userData.fotoPerfil ? `data:image/jpeg;base64,${userData.fotoPerfil}` : 'ruta/a/imagen/predeterminada.png';
          setCurrentUser({
            username: `${userData.nombreUsuario}`,
            logo: userData.foto
          });
          // Guardar en localStorage
          localStorage.setItem('user', JSON.stringify({
            ...storedUser,
            logo: userData.foto
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={`inicio-entidad ${collapsed ? 'collapsed' : ''}`}>
      <MenuLateral
        userType="entidadReceptora"
        logOut={logOut}
        collapsed={collapsed}
        toggleSidebar={toggleSidebar}
      />
      <EncabezadoInicio
        user={currentUser}
        userType="entidadReceptora"
        toggleSidebar={toggleSidebar}
        isCollapsed={collapsed}
      />
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Resumen de la entidad</h1>} />
          <Route path="perfil" element={<PerfilEntidadReceptora user={currentUser} setUser={setCurrentUser} />} />
          <Route path="vacantes" element={<Vacantes />} />
          <Route path="documentos" element={<Documentos />} />
          <Route path="registrar-asesor" element={<RegistrarAsesorExterno />} /> {/* Nueva ruta para registrar asesor */}
          {/* Agrega aquí las rutas para las otras secciones */}
        </Routes>
      </div>
    </div>
  );
};

export default InicioEntidad;
