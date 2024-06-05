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

const InicioAlumno = ({ user, logOut }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
            username: `${userData.nombre} ${userData.apellidoPaterno} ${userData.apellidoMaterno}`,
            logo: userData.foto
          });
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
        userType={currentUser?.tipo || "alumno"} 
        logOut={logOut} 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
      />
      <EncabezadoInicio user={currentUser} toggleSidebar={toggleSidebar} />
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Resumen de práctica profesional</h1>} />
          <Route path="perfil" element={<Perfil user={currentUser} setUser={setCurrentUser} />} />
          <Route path="asesor" element={<Asesor />} />
          <Route path="documentos" element={<Documentos />} />
          <Route path="avance" element={<Avance />} />
          <Route path="vacantes" element={<Vacantes />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default InicioAlumno;
