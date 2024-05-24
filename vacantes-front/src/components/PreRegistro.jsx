import React from 'react';
import { useNavigate } from 'react-router-dom';
import Titulo from './common/Titulo'; 

const PreRegistro = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div>
      <Titulo titulo='Selecciona el tipo de usuario deseado para registrarte' />
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h3 className="card-title pricing-card-title">Empresa</h3>
            </div>
            <div className="card-body">
              <h4 className="my-0 fw-normal"><small className="text-body-secondary fw-medium">Registrate como entidad receptora</small></h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Gestiona vacantes</li>
                <li>Visualiza postulaciones</li>
                <li>Recibe y envía documentos</li>
                <li>Genera informes</li>
              </ul>
              <button 
                type="button" 
                className="w-100 btn btn-lg btn-outline-primary"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h3 className="card-title pricing-card-title">Alumno</h3>
            </div>
            <div className="card-body">
              <h4 className="my-0 fw-normal"><small className="text-body-secondary fw-medium">Registrate como alumno del DASC</small></h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Aplica a vacantes</li>
                <li>Lleva el seguimiento de tu PP</li>
                <li>Recibe y envía documentos</li>
                <li>Comunícate con asesores y empresas</li>
              </ul>
              <button 
                type="button" 
                className="w-100 btn btn-lg btn-outline-primary"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h3 className="card-title pricing-card-title">Asesor</h3>
            </div>
            <div className="card-body">
              <h4 className="my-0 fw-normal"><small className="text-body-secondary fw-medium">Registrate como asesor interno</small></h4>
              <ul className="list-unstyled mt-3 mb-4">
                <li>Gestiona alumnos</li>
                <li>Visualiza postulaciones</li>
                <li>Recibe y envía documentos</li>
                <li>Genera informes</li>
              </ul>
              <button 
                type="button" 
                className="w-100 btn btn-lg btn-outline-primary"
                onClick={handleRegisterClick}
              >
                Registrarse
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreRegistro;
