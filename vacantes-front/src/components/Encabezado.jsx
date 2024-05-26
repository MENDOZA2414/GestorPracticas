import React from 'react';
import { Link } from 'react-router-dom';

const Encabezado = ({ user, logOut }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
        <div className="container-fluid px-5">
          <Link to="/" className="navbar-brand mx-auto mx-lg-0 d-flex align-items-center">
            <img src="./../public/dasc.png" className="bi me-5" width="140" height="52" alt="Logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/ofertas" className="nav-link">Ofertas</Link>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">Pricing</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">FAQs</a>
                </li>
                <li className="nav-item">
                  <a href="#" className="nav-link">About</a>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto">
                {user !== undefined ? (
                  <>
                    <li className="nav-item">
                      <Link to="/misOfertas" className="nav-link">Usuario actual: <strong>{user.username ?? 'Upps!'} - {user.company.toUpperCase() ?? 'Upps!'}</strong></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/login" onClick={logOut} className="nav-link text-danger">Cerrar sesión</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">Iniciar sesión</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/preRegistro" className="nav-link">Registro</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Encabezado;
