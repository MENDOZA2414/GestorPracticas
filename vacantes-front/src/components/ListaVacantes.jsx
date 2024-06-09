import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';
import moment from 'moment';
import './vacantesEntidad.css';

const ListaVacantes = ({ setSelected_job, vacantes, setVacante, setEliminar }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedVacante, setSelectedVacante] = useState(null);

  const handleViewVacante = (vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVacante(null);
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
                <span>{item.titulo}</span>
                <br />
                <span>{item.ciudad}</span>
              </div>
              <div className="vacantes-enti-actions">
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
        <div className="vacantes-enti-modal">
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
  setSelected_job: PropTypes.func.isRequired,
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
  setVacante: PropTypes.func.isRequired,
  setEliminar: PropTypes.func.isRequired,
};

export default ListaVacantes;
