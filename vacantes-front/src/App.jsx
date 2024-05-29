import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
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

const AppContent = () => {
  const [user, setUser] = useState(undefined);
  const [pagina, setPagina] = useState(1);
  const location = useLocation(); // Utiliza useLocation para obtener la ruta actual

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

  const showHeader = showHeaderRoutes.includes(location.pathname); // Verifica si la ruta actual debe mostrar el encabezado

  useEffect(() => {}, [user, pagina]);

  return (
    <>
      {showHeader && <Encabezado user={user} logOut={logOut} />} {/* Renderiza el encabezado solo si la ruta está en showHeaderRoutes */}
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preRegistro" element={<PreRegistro />} />
          <Route path="/registrarAlumno" element={<RegistrarAlumno />} />
          <Route path="/registrarAsesor" element={<RegistrarAsesor />} />
          <Route path="/inicioAlumno" element={<InicioAlumno />} />
          <Route
            path="/misOfertas"
            element={
              <MisOfertas
                pagina={pagina}
                setPagina={setPagina}
                setUser={setUser}
              />
            }
          />
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
