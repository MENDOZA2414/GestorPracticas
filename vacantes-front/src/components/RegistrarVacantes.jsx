import { useState } from "react";
import Titulo from './common/Titulo';
import ListaVacantes from "./ListaVacantes";
import ListaPostulaciones from "./ListaPostulaciones";
import PropTypes from 'prop-types';
import './registrarVacantes.css';

const RegistrarVacantes = ({ setUser, pagina, setPagina }) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [job_type, setJob_type] = useState('');
  const [experience, setExperience] = useState('');
  const [from_date, setFrom_date] = useState('');
  const [until_date, setUntil_date] = useState('');
  const job_type_list = ['Remoto', 'Presencial', 'Semi-presencial'];

  const limpiarCampos = () => {
    setCity('');
    setTitle('');
    setExperience('');
    setFrom_date('');
    setUntil_date('');
    setJob_type('');
  };

  return (
    <form>
      <div className="registrar-vacantes-container">
        <div className="registrar-vacantes-row">
          <div className="registrar-vacantes-col left-col">
            <Titulo titulo='Registrar Vacantes' />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body">
                <h5 className="registrar-vacantes-card-title">Ingrese los datos</h5>

                <div className="registrar-vacantes-input-group">
                  <input
                    type="text"
                    placeholder="Nombre de la vacante ej:React Dev"
                    className="registrar-vacantes-input"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <input
                    type="text"
                    placeholder="Ciudad/País"
                    className="registrar-vacantes-input"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <input
                    type="number"
                    placeholder="Experiencia (años)"
                    className="registrar-vacantes-input"
                    min="1"
                    onChange={(e) => setExperience(e.target.value)}
                    value={experience}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <select
                    className="registrar-vacantes-select"
                    value={job_type}
                    onChange={(e) => setJob_type(e.target.value)}
                  >
                    <option value=''>Tipo de trabajo</option>
                    {
                      job_type_list.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="registrar-vacantes-input-group">
                  <label className="registrar-vacantes-label">Publicar Desde:</label>
                  <input
                    type="date"
                    className="registrar-vacantes-input"
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setFrom_date(e.target.value)}
                    value={from_date}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <label className="registrar-vacantes-label">Publicar hasta:</label>
                  <input
                    type="date"
                    className="registrar-vacantes-input"
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => setUntil_date(e.target.value)}
                    value={until_date}
                  />
                </div>

                <div className="registrar-vacantes-button-group">
                  <button className="registrar-vacantes-button primary" type="submit">Publicar vacante</button>
                  <button className="registrar-vacantes-button secondary" type="button" onClick={limpiarCampos}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="registrar-vacantes-col right-col">
            <Titulo titulo='Postulaciones' />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body">
                <ListaPostulaciones postulaciones={[]} />
              </div>
            </div>
            <Titulo titulo='Lista de vacantes' />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body">
                <ListaVacantes
                  setSelected_job={() => {}}
                  setEliminar={() => {}}
                  vacante={null}
                  setVacante={() => {}}
                  vacantes={[]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

RegistrarVacantes.propTypes = {
  setUser: PropTypes.func.isRequired,
  pagina: PropTypes.number.isRequired,
  setPagina: PropTypes.func.isRequired,
};

export default RegistrarVacantes;
