import React, { useState } from "react";
import Titulo from "./common/Titulo";
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from './common/Error';
import md5 from 'md5';
import { Navigate } from 'react-router-dom';

const Register = () => {
  const [logo, setLogo] = useState(null); // Cambiado a null
  const [company, setCompany] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [goLogin, setGoLogin] = useState(false);

  const prevLogo = (e) => {
    e.preventDefault();
    setLogo(e.target.files[0]);
    let lector = new FileReader();
    lector.readAsDataURL(e.target.files[0]);
    lector.onload = () => {
      document.getElementById('logo').src = lector.result;
    };
  };

  const limpiarCampos = () => {
    setCompany('');
    setEmail('');
    setUsername('');
    setPassword('');
    setPasswordConfirm('');
    setLogo(null);
  };

  const registro = async (e) => {
    e.preventDefault();

    if ([logo, company, username, email, password, passwordConfirm].includes('') || password !== passwordConfirm) {
      setError(true);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Debe llenar todos los campos y las contraseñas deben coincidir",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    } else {
      setError(false);
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('logo', logo);
      formData.append('company', company);
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);

      const { data } = await axios.post(`http://localhost:3001/company`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });

      const dataCom = { logo, company, username, email, id: data.data.insertId };
      const idSession = md5(dataCom.id + dataCom.email + dataCom.username);
      localStorage.setItem('user', JSON.stringify(dataCom));
      localStorage.setItem('idSession', idSession);
      setGoLogin(true);
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
    limpiarCampos();
    setLoading(false);
  };

  if (goLogin) {
    return <Navigate to="/misOfertas" />;
  }

  return (
    <>
      <Titulo titulo="Registro de empresas" />
      <form onSubmit={registro}>
        <div className="container">
          <div className="row">
            <div className="col-md">
              <img width="100%" src="./../../public/slider/slide1.jpg" alt="" />
              <p>Accede a nuestra comunidad de talento y haz un seguimiento de tus candidaturas</p>
              <p>Aplica a todas nuestras ofertas sin tener que repetir tu información una y otra vez</p>
              <p>Mantente informado de nuevas ofertas que sean de tu interés</p>
            </div>
            <div className="col-md">
              <div className="card border mb-3">
                <div className="card-body">
                  <h5 className="card-title text-center">Ingrese los datos</h5>
                  <div className="mb-3 text-center"><img id="logo" width='150px' src="./../../public/vite.svg" alt="" /></div>
                  <div className="mb-3">
                    <label className="form-label">Logo de la empresa</label>
                    <input
                      type="file"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={prevLogo}
                      accept="image/*"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre de la empresa</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setCompany(e.target.value)}
                      value={company}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nombre del usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={passwordConfirm}
                    />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-success me-md-2" type="submit">
                      Crear cuenta empresa
                    </button>
                    <button onClick={limpiarCampos} className="btn btn-primary" type="button">
                      Cancelar
                    </button>
                  </div>
                  {error && <Error mensaje='Todos los campos son obligatorios' />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
