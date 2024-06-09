import React, { useState, useEffect } from 'react';
import Titulo from './common/Titulo';
import ListaVacantes from "./ListaVacantes";
import ListaPostulaciones from "./ListaPostulaciones";
import PropTypes from 'prop-types';
import axios from 'axios';
import './registrarVacantes.css';

const RegistrarVacantes = ({ setUser, pagina, setPagina }) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [job_type, setJob_type] = useState('');
  const [from_date, setFrom_date] = useState('');
  const [until_date, setUntil_date] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [vacantes, setVacantes] = useState([]);
  const job_type_list = ['Remoto', 'Presencial', 'Semi-presencial'];

  const limpiarCampos = () => {
    setCity('');
    setTitle('');
    setFrom_date('');
    setUntil_date('');
    setJob_type('');
    setDescripcion('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Formatear fechas correctamente
    const formattedFromDate = new Date(from_date).toISOString().split('T')[0];
    const formattedUntilDate = new Date(until_date).toISOString().split('T')[0];

    try {
      const response = await axios.post('/vacantePractica', {
        titulo: title,
        fechaInicio: formattedFromDate,
        fechaFinal: formattedUntilDate,
        ciudad: city,
        tipoTrabajo: job_type,
        descripcion: descripcion,
        entidadID: 1, // Reemplazar con la entidadID correspondiente
        asesorExternoID: 1 // Reemplazar con el asesorExternoID correspondiente
      });

      if (response.status === 201) {
        alert('Vacante creada con éxito');
        limpiarCampos();
        fetchVacantes(); // Actualiza la lista de vacantes después de crear una nueva
      }
    } catch (error) {
      alert('Error al crear la vacante: ' + error.response.data.message);
    }
  };

  const fetchVacantes = async () => {
    try {
      const response = await axios.get(`/vacantePractica/all/1/1/10`); // Reemplazar con la entidadID, page y limit correspondientes
      console.log(response.data);
      setVacantes(response.data);
    } catch (error) {
      alert('Error al obtener las vacantes: ' + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchVacantes();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
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
                <div className="registrar-vacantes-input-group">
                  <textarea
                    placeholder="Descripción de la vacante"
                    className="registrar-vacantes-textarea"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}
                    style={{ height: '80px', resize: 'none' }} // Ajusta el alto y deshabilita el cambio de tamaño
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
                  vacantes={vacantes}
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
