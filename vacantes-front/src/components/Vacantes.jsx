import React, { useState } from 'react';
import { FaFilePdf } from 'react-icons/fa';
import './vacantes.css';

const Vacantes = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);

  const exampleVacancy = {
    title: 'Desarrollador Frontend',
    company: 'Tech Solutions',
    description: 'Buscamos un desarrollador frontend con experiencia en React y JavaScript.',
    location: 'Remoto',
    logo: 'https://via.placeholder.com/150', // URL de la imagen de la empresa
  };

  const handleFileUpload = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
    } else {
      alert('Por favor, sube solo archivos PDF.');
    }
  };

  const handleApplyClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFile(null);
  };

  const handleConfirm = () => {
    if (file) {
      alert(`Carta de presentación enviada: ${file.name}`);
      handleCloseModal();
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="vacantes">
      <h1>Vacantes Disponibles</h1>
      <div className="vacante-card">
        <div className="vacante-card-header">
          <img src={exampleVacancy.logo} alt="Logo de la empresa" className="company-logo" />
          <div>
            <h2>{exampleVacancy.title}</h2>
            <h3>{exampleVacancy.company}</h3>
          </div>
        </div>
        <p>{exampleVacancy.description}</p>
        <p><strong>Ubicación:</strong> {exampleVacancy.location}</p>
        <button className="apply-button" onClick={handleApplyClick}>Aplicar a vacante</button>
      </div>

      {showModal && (
        <div className="vacante-modal">
          <div className="vacante-modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Subir Carta de Presentación</h2>
            <div className="vacancy-details">
              <h3>{exampleVacancy.title}</h3>
              <h4>{exampleVacancy.company}</h4>
              <p>{exampleVacancy.description}</p>
              <p><strong>Ubicación:</strong> {exampleVacancy.location}</p>
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
