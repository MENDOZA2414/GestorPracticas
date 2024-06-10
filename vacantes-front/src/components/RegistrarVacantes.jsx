import React, { useState, useEffect } from 'react';
import Titulo from './common/Titulo';
import ListaVacantes from "./ListaVacantes";
import ListaPostulaciones from "./ListaPostulaciones";
import PropTypes from 'prop-types';
import axios from 'axios';
import Swal from 'sweetalert2';
import './registrarVacantes.css';

const RegistrarVacantes = ({ setUser, pagina, setPagina }) => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [job_type, setJob_type] = useState('');
  const [from_date, setFrom_date] = useState('');
  const [until_date, setUntil_date] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [vacantes, setVacantes] = useState([]);
  const [postulaciones, setPostulaciones] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingVacanteId, setEditingVacanteId] = useState(null);
  const [isFormModified, setIsFormModified] = useState(false); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const job_type_list = ['Remoto', 'Presencial', 'Semi-presencial'];

  const limpiarCampos = () => {
    setCity('');
    setTitle('');
    setFrom_date('');
    setUntil_date('');
    setJob_type('');
    setDescripcion('');
    setIsEditing(false);
    setEditingVacanteId(null);
    setIsFormModified(false);
  };

  const handleChange = () => {
    setIsFormModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormModified) {
      return;
    }

    const formattedFromDate = new Date(from_date).toISOString().split('T')[0];
    const formattedUntilDate = new Date(until_date).toISOString().split('T')[0];

    try {
      if (isEditing) {
        const response = await axios.put(`/vacantePractica/${editingVacanteId}`, {
          titulo: title,
          fechaInicio: formattedFromDate,
          fechaFinal: formattedUntilDate,
          ciudad: city,
          tipoTrabajo: job_type,
          descripcion: descripcion,
          entidadID: 1,
          asesorExternoID: 1
        });

        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Vacante actualizada con éxito',
            showConfirmButton: false,
            timer: 1500
          });
          limpiarCampos();
          fetchVacantes();
        }
      } else {
        const response = await axios.post('/vacantePractica', {
          titulo: title,
          fechaInicio: formattedFromDate,
          fechaFinal: formattedUntilDate,
          ciudad: city,
          tipoTrabajo: job_type,
          descripcion: descripcion,
          entidadID: 1,
          asesorExternoID: 1
        });

        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Vacante creada con éxito',
            showConfirmButton: false,
            timer: 1500
          });
          limpiarCampos();
          fetchVacantes();
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al crear/actualizar la vacante: ' + error.response.data.message,
      });
    }
  };

  const fetchVacantes = async () => {
    try {
      const response = await axios.get(`/vacantePractica/all/1/1/10`);
      setVacantes(response.data);
    } catch (error) {
      alert('Error al obtener las vacantes: ' + error.response.data.message);
    }
  };

  const fetchPostulaciones = async (vacanteID) => {
    try {
        const response = await axios.get(`/aplicaciones/${vacanteID}`);
        if (response.status === 200) {
            const data = response.data.map(postulacion => ({
                ...postulacion,
                cartaPresentacion: `http://localhost:3001/documento/${postulacion.cartaPresentacion}`,
                id: postulacion.postulacionID // Agrega esta línea
            }));
            console.log(data); // Verificar datos aquí
            setPostulaciones(data);
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            setPostulaciones([]);
        } else {
            console.error('Error al obtener las postulaciones:', error);
            alert('Error al obtener las postulaciones: ' + error.response.data.message);
        }
    }
};





  const handleEditVacante = (vacante) => {
    setTitle(vacante.titulo);
    setCity(vacante.ciudad);
    setJob_type(vacante.tipoTrabajo);
    setFrom_date(vacante.fechaInicio.split('T')[0]);
    setUntil_date(vacante.fechaFinal.split('T')[0]);
    setDescripcion(vacante.descripcion);
    setIsEditing(true);
    setEditingVacanteId(vacante.vacantePracticaID);
  };

  const handleApprove = async (postulacionID) => {
    // Implementa la lógica de aprobación
    console.log(`Aprobar postulación ${postulacionID}`);
  };

  const handleReject = async (postulacionID) => {
    // Implementa la lógica de rechazo
    console.log(`Rechazar postulación ${postulacionID}`);
  };

  useEffect(() => {
    fetchVacantes();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="registrar-vacantes-container">
        <div className="registrar-vacantes-row">
          <div className="registrar-vacantes-col left-col">
            <Titulo titulo={isEditing ? 'Editar Vacante' : 'Registrar Vacantes'} />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body">
                <h5 className="registrar-vacantes-card-title">Ingrese los datos</h5>

                <div className="registrar-vacantes-input-group">
                  <input
                    type="text"
                    placeholder="Nombre de la vacante ej:React Dev"
                    className="registrar-vacantes-input"
                    onChange={(e) => { setTitle(e.target.value); handleChange(); }}
                    value={title}
                    required
                    disabled={isModalOpen}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <input
                    type="text"
                    placeholder="Ciudad/País"
                    className="registrar-vacantes-input"
                    onChange={(e) => { setCity(e.target.value); handleChange(); }}
                    value={city}
                    required
                    disabled={isModalOpen}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <select
                    className="registrar-vacantes-select"
                    value={job_type}
                    onChange={(e) => { setJob_type(e.target.value); handleChange(); }}
                    required
                    disabled={isModalOpen}
                  >
                    <option value=''>Modalidad</option>
                    {
                      job_type_list.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="registrar-vacantes-input-group">
                  <label className="registrar-vacantes-label">Fecha de Inicio:</label>
                  <input
                    type="date"
                    className="registrar-vacantes-input"
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => { setFrom_date(e.target.value); handleChange(); }}
                    value={from_date}
                    required
                    disabled={isModalOpen} 
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <label className="registrar-vacantes-label">Fecha de Fin:</label>
                  <input
                    type="date"
                    className="registrar-vacantes-input"
                    min={new Date().toISOString().slice(0, 10)}
                    onChange={(e) => { setUntil_date(e.target.value); handleChange(); }}
                    value={until_date}
                    required
                    disabled={isModalOpen}
                  />
                </div>
                <div className="registrar-vacantes-input-group">
                  <textarea
                    placeholder="Descripción de la vacante"
                    className="registrar-vacantes-textarea"
                    onChange={(e) => { setDescripcion(e.target.value); handleChange(); }}
                    value={descripcion}
                    style={{ height: '80px', resize: 'none' }}
                    required
                    disabled={isModalOpen}
                  />
                </div>
                <div className="registrar-vacantes-button-group">
                  <button className="registrar-vacantes-button primary" type="submit">{isEditing ? 'Confirmar' : 'Publicar vacante'}</button>
                  <button className="registrar-vacantes-button secondary" type="button" onClick={limpiarCampos}>Cancelar</button>
                </div>
              </div>
            </div>
          </div>

          <div className="registrar-vacantes-col right-col">
            <Titulo titulo='Postulaciones' />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body">
                <ListaPostulaciones 
                  postulaciones={postulaciones} 
                  handleApprove={handleApprove} 
                  handleReject={handleReject} 
                />
              </div>
            </div>
            <Titulo titulo='Lista de vacantes' />
            <div className="registrar-vacantes-card">
              <div className="registrar-vacantes-card-body vacantes-lista">
                <ListaVacantes
                  setSelected_job={() => {}}
                  setEliminar={() => {}}
                  vacante={null}
                  setVacante={handleEditVacante}
                  vacantes={vacantes}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedPostulaciones={fetchPostulaciones}
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