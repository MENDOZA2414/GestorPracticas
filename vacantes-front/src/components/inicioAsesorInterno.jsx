import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Perfil from './Perfil';
import DocumentosInterno from './DocumentosInterno'; 
import Vacantes from './Vacantes'; 
import EncabezadoInicio from './EncabezadoInicio'; 
import MenuLateral from './MenuLateral'; 
import './inicioAsesorInterno.css';
import PerfilAsesorInterno from './PerfilAsesorInterno';

const InicioAsesorInterno = ({ user, logOut }) => {
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
          const response = await axios.get(`http://localhost:3001/asesorInterno/${storedUser.id}`);
          const userData = response.data;
          userData.foto = userData.fotoPerfil ? `data:image/jpeg;base64,${userData.fotoPerfil}` : 'ruta/a/imagen/predeterminada.png';
          setCurrentUser({
            username: `${userData.nombre}`,
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
    <div className={`inicio-asesor-interno ${collapsed ? 'collapsed' : ''}`}>
      <MenuLateral 
        userType="asesorInterno" 
        logOut={logOut} 
        collapsed={collapsed} 
        toggleSidebar={toggleSidebar} 
      />
       <EncabezadoInicio 
        user={currentUser} 
        userType="asesorInterno"  // Pasa userType directamente 
        toggleSidebar={toggleSidebar} 
        isCollapsed={collapsed} 
      />
      <div className={`content ${collapsed ? 'collapsed' : ''}`}>
        <Routes>
          <Route path="/" element={<h1>Gestor de prácticas</h1>} />
          <Route path="perfil" element={<PerfilAsesorInterno user={currentUser} setUser={setCurrentUser} />} />
          <Route path="vacantes" element={<Vacantes />} />
          <Route path="documentos" element={<DocumentosInterno />} />
         
        </Routes>
      </div>
    </div>
  );
};

export default InicioAsesorInterno;
