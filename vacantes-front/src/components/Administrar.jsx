import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaBriefcase, FaBuilding, FaEye, FaCheck, FaTimes, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import moment from 'moment';
import './administrar.css';

const Administrar = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState('vacantes');
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState('');
  const [confirmMessage, setConfirmMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (isRegistered) {
          switch (selectedOption) {
            case 'entidades':
              response = await axios.get('http://localhost:3001/entidades/registered');
              break;
            case 'alumnos':
              response = await axios.get('http://localhost:3001/alumnos/registered');
              break;
            case 'vacantes':
            default:
              response = await axios.get('http://localhost:3001/vacantePractica/registered');
              break;
          }
        } else {
          switch (selectedOption) {
            case 'entidades':
              response = await axios.get('http://localhost:3001/entidades/all');
              break;
            case 'alumnos':
              response = await axios.get('http://localhost:3001/alumnos/all');
              break;
            case 'vacantes':
            default:
              response = await axios.get('http://localhost:3001/vacantePractica/all/1/100');
              break;
          }
        }
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedOption, isRegistered]);

  const handleAcceptClick = (item) => {
    setSelectedItem(item);
    setConfirmAction('accept');
    setConfirmMessage('¿Estás seguro de que deseas aceptar este alumno?');
    setShowConfirmModal(true);
  };

  const handleRejectClick = (item) => {
    setSelectedItem(item);
    setConfirmAction('reject');
    setConfirmMessage('¿Estás seguro de que deseas rechazar este alumno?');
    setShowConfirmModal(true);
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setConfirmAction('delete');
    setConfirmMessage(`¿Estás seguro de que deseas eliminar esta ${selectedOption.slice(0, -1)}?`);
    setShowConfirmModal(true);
  };

  const handleViewClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    if (confirmAction === 'accept') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Alumno aceptado con éxito',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (confirmAction === 'reject') {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Alumno rechazado',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (confirmAction === 'delete') {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: `${selectedOption.slice(0, -1).charAt(0).toUpperCase() + selectedOption.slice(1, -1).slice(1)} eliminada con éxito`,
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const renderTitle = () => {
    switch (selectedOption) {
      case 'entidades':
        return isRegistered ? 'Entidades Registradas' : 'Solicitudes de Entidades';
      case 'alumnos':
        return isRegistered ? 'Alumnos Registrados' : 'Solicitudes de Alumnos';
      case 'vacantes':
      default:
        return isRegistered ? 'Vacantes Registradas' : 'Aprobación de Vacantes';
    }
  };

  const renderButtons = (item) => {
    if (isRegistered) {
      return (
        <>
          <FaEye className="admin-action-icon view-icon" onClick={() => handleViewClick(item)} />
          <FaTrash className="admin-action-icon delete-icon" onClick={() => handleDeleteClick(item)} />
        </>
      );
    }
    return (
      <>
        <FaEye className="admin-action-icon view-icon" onClick={() => handleViewClick(item)} />
        <FaCheck className="admin-action-icon accept-icon" onClick={() => handleAcceptClick(item)} />
        <FaTimes className="admin-action-icon reject-icon" onClick={() => handleRejectClick(item)} />
      </>
    );
  };

  return (
    <div className="admin-administrar">
      <div className="admin-administrar-header">
        <h1 className="admin-administrar-title">{renderTitle()}</h1>
        <div className="admin-administrar-icons">
          <Switch
            checked={isRegistered}
            onChange={() => setIsRegistered(!isRegistered)}
            offColor="#888"
            onColor="#0d6efd"
            onHandleColor="#fff"
            handleDiameter={20}
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={48}
            className="react-switch"
          />
          <div
            className={`admin-icon-circle ${selectedOption === 'alumnos' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('alumnos')}
          >
            <FaUserGraduate className="admin-icon" />
          </div>
          <div
            className={`admin-icon-circle ${selectedOption === 'vacantes' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('vacantes')}
          >
            <FaBriefcase className="admin-icon" />
          </div>
          <div
            className={`admin-icon-circle ${selectedOption === 'entidades' ? 'selected' : ''}`}
            onClick={() => setSelectedOption('entidades')}
          >
            <FaBuilding className="admin-icon" />
          </div>
        </div>
      </div>
      <div className="admin-administrar-card">
        <div className="admin-administrar-list">
          {data.map((item, index) => (
            <div key={index} className="admin-administrar-list-item">
              <img src={item.logoEmpresa || 'https://via.placeholder.com/50'} alt="Logo" className="admin-company-logo" />
              <div className="admin-administrar-list-item-content">
                <h2>{item.titulo || item.nombre || 'Nombre Desconocido'}</h2>
              </div>
              <div className="admin-administrar-footer">
                {renderButtons(item)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="admin-administrar-modal">
          <div className="admin-administrar-modal-content">
            <span className="admin-close-button" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Detalles</h2>
            <div className="admin-details">
              <h3>{selectedItem?.titulo || selectedItem?.nombre}</h3>
              <h4>{selectedItem?.nombreEmpresa || 'Empresa/Entidad Desconocida'}</h4>
              <p>{selectedItem?.descripcion || 'Descripción no disponible'}</p>
              <div className="admin-info-horizontal">
                <p><strong>Ubicación:</strong> {selectedItem?.ciudad || 'Ciudad Desconocida'}</p>
                <p><strong>Duración:</strong> {selectedItem?.fechaInicio ? moment(selectedItem.fechaInicio).format('DD/MM/YYYY') : 'Fecha Desconocida'} - {selectedItem?.fechaFinal ? moment(selectedItem.fechaFinal).format('DD/MM/YYYY') : 'Fecha Desconocida'}</p>
                <p><strong>Tipo de Trabajo:</strong> {selectedItem?.tipoTrabajo || 'Tipo Desconocido'}</p>
                <p><strong>Asesor Externo:</strong> {`${selectedItem?.nombreAsesorExterno || ''} ${selectedItem?.apellidoPaternoAsesorExterno || ''} ${selectedItem?.apellidoMaternoAsesorExterno || ''}`.trim()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="admin-confirm-modal">
          <div className="admin-confirm-modal-content">
            <h2>Confirmar Acción</h2>
            <p>{confirmMessage}</p>
            <div className="admin-confirm-buttons">
              <button className="admin-confirm-button blue" onClick={handleConfirm}>Confirmar</button>
              <button className="admin-confirm-button red" onClick={() => setShowConfirmModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Administrar;