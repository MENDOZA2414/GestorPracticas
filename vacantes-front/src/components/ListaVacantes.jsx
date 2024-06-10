import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import axios from 'axios';
import './vacantesEntidad.css';

const ListaVacantes = ({ vacantes, setVacante, setEliminar, setIsModalOpen, setSelectedPostulaciones }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVacante, setSelectedVacante] = useState(null);

  useEffect(() => {
    fetchVacantes();
  }, []);

  const fetchVacantes = async () => {
    try {
      const response = await axios.get('http://localhost:3001/vacantePractica');
      setVacantes(response.data);
    } catch (error) {
      console.error('Error fetching vacantes:', error);
    }
  };

  const handleAccept = async (postulacionID) => {
    try {
      const response = await axios.post('http://localhost:3001/acceptPostulacion', {
        postulacionID,
        fechaInicio: '2024-06-01', // Asegúrate de enviar las fechas correctas
        fechaFin: '2024-12-01',
        estado: 'Aceptado'
      });

      alert('Postulación aceptada: ' + response.data.message);
      // Actualizar la lista de postulaciones y vacantes después de aceptar una
      fetchVacantes();
    } catch (error) {
      console.error('Error accepting postulacion:', error);
      alert('Error al aceptar la postulación: ' + error.response.data.message);
    }
  };

  const handleReject = async (postulacionID) => {
    try {
      const response = await axios.post('http://localhost:3001/rejectPostulacion', { postulacionID });
      alert('Postulación rechazada: ' + response.data.message);
      // Actualizar la lista de postulaciones después de rechazar una
      fetchVacantes();
    } catch (error) {
      console.error('Error rejecting postulacion:', error);
      alert('Error al rechazar la postulación: ' + error.response.data.message);
    }
  };

  const handleViewVacante = (vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
    setIsModalOpen(true); // Marca el modal como abierto
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVacante(null);
    setIsModalOpen(false); // Marca el modal como cerrado
  };

  return (
    <div className="vacantes-enti">
      {vacantes.length === 0 ? (
        <p className="text-center">Sin vacantes registradas</p>
      ) : (
        <div className="vacantes-enti-card">
          {vacantes.map((item) => (
            <div key={item.vacantePracticaID} className="vacantes-enti-item">
              <div>
                <span className="vacantes-enti-item-title">{item.titulo}</span>
                <br />
                <span>{item.ciudad}</span>
              </div>
              <div className="vacantes-enti-actions">
                <button className="icon-button" onClick={() => setSelectedPostulaciones(item.vacantePracticaID)} aria-label={`Ver postulaciones ${item.titulo}`}>
                  Postulaciones
                </button>
                <button className="icon-button" onClick={() => handleViewVacante(item)} aria-label={`Ver vacante ${item.titulo}`}>
                  <FaEye />
                </button>
                <button className="icon-button" onClick={() => setVacante(item)} aria-label={`Editar vacante ${item.titulo}`}>
                  <FaEdit />
                </button>
                <button className="icon-button" onClick={() => setEliminar(item.vacantePracticaID)} aria-label={`Eliminar vacante ${item.titulo}`}>
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showModal && selectedVacante && (
        <div className="vacantes-enti-modal" tabIndex="-1" aria-hidden="true">
          <div className="vacantes-enti-modal-content">
            <span className="vacantes-enti-close-button" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedVacante.titulo}</h2>
            <p><strong>Tipo de Trabajo:</strong> {selectedVacante.tipoTrabajo}</p>
            <p><strong>Ciudad:</strong> {selectedVacante.ciudad}</p>
            <p><strong>Descripción:</strong> {selectedVacante.descripcion}</p>
            <p><strong>Fecha de Inicio:</strong> {moment(selectedVacante.fechaInicio).format('DD/MM/YYYY')}</p>
            <p><strong>Fecha de Fin:</strong> {moment(selectedVacante.fechaFinal).format('DD/MM/YYYY')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

ListaVacantes.propTypes = {
  setVacante: PropTypes.func.isRequired,
  setEliminar: PropTypes.func.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  setSelectedPostulaciones: PropTypes.func.isRequired,
  vacantes: PropTypes.arrayOf(
    PropTypes.shape({
      vacantePracticaID: PropTypes.number.isRequired,
      titulo: PropTypes.string.isRequired,
      tipoTrabajo: PropTypes.string.isRequired,
      ciudad: PropTypes.string.isRequired,
      descripcion: PropTypes.string.isRequired,
      fechaInicio: PropTypes.string.isRequired,
      fechaFinal: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ListaVacantes;
