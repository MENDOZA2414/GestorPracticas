import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './vacantes.css';

const Vacantes = () => {
  const [vacantes, setVacantes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [selectedVacante, setSelectedVacante] = useState(null);

  useEffect(() => {
    const fetchVacantes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/vacantePractica/all/1/1/10');
        setVacantes(response.data);
      } catch (error) {
        console.error('Error fetching vacantes:', error);
        setVacantes([{
          titulo: 'Titulo',
          descripcion: 'Descripcion',
          ciudad: 'X',
          fechaInicio: '2024-06-15',
          fechaFinal: '2024-12-15',
          tipoTrabajo: 'Remoto',
          nombreAsesorExterno: 'Nombre Asesor',
          logoEmpresa: 'https://via.placeholder.com/150',
        }]);
      }
    };

    fetchVacantes();
  }, []);

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Por favor, sube solo archivos PDF.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  const handleApplyClick = (vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
  };

  const handleConfirm = async () => {
    if (file) {
      const formData = new FormData();
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const alumnoID = storedUser ? storedUser.id : '12343'; // Debes ajustar esto para que sea dinámico según el alumno logueado
      const vacanteID = selectedVacante.vacantePracticaID;

      formData.append('alumnoID', alumnoID);
      formData.append('vacanteID', vacanteID);
      formData.append('cartaPresentacion', file);

      try {
        const response = await axios.post('http://localhost:3001/registerPostulacion', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Postulación registrada con éxito',
          showConfirmButton: false,
          timer: 2000
        });
        handleCloseModal();
      } catch (error) {
        console.error('Error enviando la postulación:', error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un error al enviar la postulación. Intenta nuevamente.',
          showConfirmButton: false,
          timer: 2000
        });
      }
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="vacantes">
      <h1>Vacantes Disponibles</h1>
      {vacantes.map((vacante, index) => (
        <div key={index} className="vacante-card">
          <div className="vacante-card-header">
            <img src={vacante.logoEmpresa || 'https://via.placeholder.com/150'} alt="Logo de la empresa" className="company-logo" />
            <div>
              <h2>{vacante.titulo}</h2>
              <h3>{vacante.nombreEmpresa || 'Empresa Desconocida'}</h3>
            </div>
          </div>
          <p>{vacante.descripcion}</p>
          <p><strong>Ubicación:</strong> {vacante.ciudad}</p>
          <p><strong>Fecha de Inicio:</strong> {vacante.fechaInicio}</p>
          <p><strong>Fecha Final:</strong> {vacante.fechaFinal}</p>
          <p><strong>Tipo de Trabajo:</strong> {vacante.tipoTrabajo}</p>
          <p><strong>Asesor Externo:</strong> {vacante.nombreAsesorExterno}</p>
          <button className="apply-button" onClick={() => handleApplyClick(vacante)}>Aplicar a vacante</button>
        </div>
      ))}

      {showModal && (
        <div className="vacante-modal">
          <div className="vacante-modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Subir Carta de Presentación</h2>
            <div className="vacancy-details">
              <h3>{selectedVacante?.titulo}</h3>
              <h4>{selectedVacante?.nombreEmpresa || 'Empresa Desconocida'}</h4>
              <p>{selectedVacante?.descripcion}</p>
              <p><strong>Ubicación:</strong> {selectedVacante?.ciudad}</p>
              <p><strong>Fecha de Inicio:</strong> {selectedVacante?.fechaInicio}</p>
              <p><strong>Fecha Final:</strong> {selectedVacante?.fechaFinal}</p>
              <p><strong>Tipo de Trabajo:</strong> {selectedVacante?.tipoTrabajo}</p>
              <p><strong>Asesor Externo:</strong> {selectedVacante?.nombreAsesorExterno}</p>
            </div>
            <input 
              type="file" 
              accept="application/pdf" 
              onChange={handleFileUpload} 
              id="fileInput" 
              style={{ display: 'none' }} 
            />
            <button className="upload-button-vacantes" onClick={handleButtonClick}>
              <FaFilePdf className="pdf-icon" /> Subir carta de presentación
            </button>
            {file && <p>Archivo subido: {file.name}</p>}
            <button className="confirm-button" onClick={handleConfirm} disabled={!file}>
              Confirmar tu entrada
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vacantes;
