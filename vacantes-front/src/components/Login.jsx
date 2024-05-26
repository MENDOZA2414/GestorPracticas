import { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Error from './common/Error';
import md5 from 'md5';
import Titulo from './common/Titulo';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [goMisOfertas, setGoMisOfertas] = useState(false);
  const [userType, setUserType] = useState('entidad'); // Estado para el tipo de usuario

  const login = async (e) => {
    e.preventDefault();

    // Validar
    if ([email, password].includes('') || [email, password].includes('#')) {
      setError(true);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Debe llenar todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else setError(false);

    try {
      const endpoint = userType === 'alumno' ? 'login/alumno' : 'login/entidad';
      const { data } = await axios.post(`http://localhost:3001/${endpoint}`, { email, password });
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        html: `Bienvenido/a <strong>${data.nombre || data.company}</strong>`,
        showConfirmButton: false,
        timer: 2000,
      });

      const dataCom = { email };
      dataCom.id = await data.entidadID || data.alumnoID;
      dataCom.company = await data.nombreEntidad || data.nombre;
      dataCom.username = await data.nombreUsuario;
      dataCom.email = await data.correo;
      dataCom.logo = await data.fotoPerfil;
      const idSession = await md5(dataCom.id + dataCom.email + dataCom.username);
      localStorage.setItem('user', JSON.stringify(dataCom));
      localStorage.setItem('idSession', idSession);
      setGoMisOfertas(true);
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message.includes('401') ? 'Datos de acceso incorrectos' : err.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  if (goMisOfertas) {
    return <Navigate to="/misOfertas" />;
  }

  return (
    <>
      <div className="mt-5 mb-5">
        <Titulo titulo="Iniciar sesión" />
      </div>
      <form onSubmit={login} style={{ maxWidth: '500px', margin: 'auto' }}>
        <div className="card border mb-3">
          <div className="card-body">
            <h5 className="card-title text-center">Ingrese los datos</h5>
            <div className="mb-3 text-center">
              <img id="logo" width="150px" src="./../../public/vite.svg" alt="" />
            </div>
            <div className="mb-3">
              <label className="form-label">Tipo de usuario</label>
              <select
                className="form-control"
                onChange={(e) => setUserType(e.target.value)}
                value={userType}
              >
                <option value="entidad">Entidad Receptora</option>
                <option value="alumno">Alumno</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
              <button className="btn btn-success me-md-2" type="submit">
                Acceder
              </button>
            </div>
            {error && <Error mensaje="Todos los campos son obligatorios" />}
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
