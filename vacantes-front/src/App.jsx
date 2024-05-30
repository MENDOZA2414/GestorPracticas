import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Ofertas from './components/Ofertas';
import Register from './components/Register';
import MisOfertas from './components/MisOfertas';
import Encabezado from './components/Encabezado';
import PreRegistro from './components/PreRegistro';
import Principal from './components/Principal';
import RegistrarAlumno from './components/RegistrarAlumno';
import RegistrarAsesor from './components/RegistrarAsesor';
import InicioAlumno from './components/inicioAlumno';
import InicioAsesorInterno from './components/inicioAsesorInterno';
import InicioAsesorExterno from './components/inicioAsesorExterno';
import InicioEntidad from './components/inicioEntidad';
// import InicioAdministrador from './components/InicioAdministrador';

const AppContent = () => {
  const [user, setUser] = useState(undefined);
  const [pagina, setPagina] = useState(1);
  const location = useLocation();

  const logOut = () => {
    localStorage.clear();
    setUser(undefined);
  };

  const showHeaderRoutes = [
    '/',
    '/ofertas',
    '/misOfertas',
    '/login',
    '/register',
    '/preRegistro',
    '/registrarAlumno',
    '/registrarAsesor'
  ];

  const showHeader = showHeaderRoutes.includes(location.pathname);

  useEffect(() => {}, [user, pagina]);

  return (
    <>
      {showHeader && <Encabezado user={user} logOut={logOut} />}
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preRegistro" element={<PreRegistro />} />
          <Route path="/registrarAlumno" element={<RegistrarAlumno />} />
          <Route path="/registrarAsesor" element={<RegistrarAsesor />} />
          <Route path="/misOfertas" element={<MisOfertas pagina={pagina} setPagina={setPagina} setUser={setUser} />} />

          {/* Rutas específicas para cada tipo de usuario */}
          <Route path="/inicioAlumno/*" element={user?.type === 'alumno' ? <InicioAlumno user={user} logOut={logOut} /> : <Navigate to="/" />} />
          <Route path="/inicioAsesorInterno/*" element={user?.type === 'asesorInterno' ? <InicioAsesorInterno user={user} logOut={logOut} /> : <Navigate to="/" />} />
          <Route path="/inicioAsesorExterno/*" element={user?.type === 'asesorExterno' ? <InicioAsesorExterno user={user} logOut={logOut} /> : <Navigate to="/" />} />
          <Route path="/inicioEntidad/*" element={user?.type === 'entidad' ? <InicioEntidad user={user} logOut={logOut} /> : <Navigate to="/" />} />
          {/* <Route path="/inicioAdministrador/*" element={user?.type === 'administrador' ? <InicioAdministrador user={user} /> : <Navigate to="/" />} /> */}
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
