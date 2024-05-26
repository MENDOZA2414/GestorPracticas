import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Ofertas from './components/Ofertas';
import Register from './components/Register';
import MisOfertas from './components/MisOfertas';
import Encabezado from './components/Encabezado';
import PreRegistro from './components/PreRegistro';
import Principal from './components/Principal';
import RegistrarAlumno from './components/RegistrarAlumno';
import RegistrarAsesor from './components/RegistrarAsesor';

const App = () => {
  const [user, setUser] = useState(undefined);
  const [pagina, setPagina] = useState(1);

  const logOut = () => {
    localStorage.clear();
    setUser(undefined);
  };

  useEffect(() => {}, [user, pagina]);

  return (
    <BrowserRouter>
      <Encabezado user={user} logOut={logOut} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/preRegistro" element={<PreRegistro />} />
          <Route path="/registrarAlumno" element={<RegistrarAlumno />} />
          <Route path="/registrarAsesor" element={<RegistrarAsesor />} />
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
    </BrowserRouter>
  );
};

export default App;
