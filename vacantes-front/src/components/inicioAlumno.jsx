import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Perfil from './Perfil';
import Asesor from './Asesor';
import Documentos from './Documentos';
import Avance from './Avance';
import Vacantes from './Vacantes'; 
import EncabezadoInicio from './EncabezadoInicio'; 
import MenuLateral from './MenuLateral'; 
import './inicioAlumno.css';

const InicioAlumno = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          const response = await axios.get(`http://localhost:3001/alumno/${storedUser.id}`);
          const userData = response.data;
          userData.foto = userData.fotoPerfil ? `data:image/jpeg;base64,${userData.fotoPerfil}` : 'ruta/a/imagen/predeterminada.png';
          setCurrentUser({
            username: `${userData.nombre}`,
            logo: userData.foto
          });
          setUserType(storedUser.userType || "alumno"); // Aseguramos que userType se obtenga correctamente
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className={`inicio-alumno ${collapsed ? 'collapsed' : ''}`}>
      <MenuLateral 
        userType={userType || "alumno"} 
        logOut={logOut} 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
      />
      <EncabezadoInicio user={currentUser} userType={userType} toggleSidebar={toggleSidebar} isCollapsed={collapsed} />
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Resumen de práctica profesional</h1>} />
          <Route path="perfil" element={<Perfil user={currentUser} setUser={setCurrentUser} />} />
          <Route path="asesor" element={<Asesor />} />
          <Route path="documentos" element={<Documentos userType={userType} />} />
          <Route path="avance" element={<Avance />} />
          <Route path="vacantes" element={<Vacantes />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default InicioAlumno;
