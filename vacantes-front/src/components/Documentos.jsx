import React, { useState } from 'react';
import { FaFilePdf, FaEye, FaDownload, FaPaperPlane } from 'react-icons/fa';
import './documentos.css';

const Documentos = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const newDocument = {
        file: file,
        url: URL.createObjectURL(file),
      };
      setDocuments([...documents, newDocument]);
    } else {
      alert('Por favor, sube solo archivos PDF.');
    }
  };

  const handleSend = (doc) => {
    setSelectedDocument(doc);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  const handleConfirmSend = () => {
    alert(`Enviando el documento: ${selectedDocument.file.name}`);
    handleCloseModal();
  };

  return (
    <div className="card">
      <div className="card-header">
        <div className="upload-button">
          <input
            type="file"
            accept="application/pdf"
            id="file-upload"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />
          <label htmlFor="file-upload" className="upload-label">
            <FaFilePdf className="upload-icon" />
            <span>Subir Documento PDF</span>
          </label>
        </div>
      </div>
      <div className="card-body">
        <div className="documents-list">
          <h3>Documentos Subidos</h3>
          <ul>
            {documents.map((doc, index) => (
              <li key={index}>
                <div className="document-name">{doc.file.name}</div>
                <div className="document-actions">
                  <a href={doc.url} target="_blank" rel="noopener noreferrer">
                    <FaEye className="action-icon" title="Ver" />
                  </a>
                  <a href={doc.url} download={doc.file.name}>
                    <FaDownload className="action-icon" title="Descargar" />
                  </a>
                  <FaPaperPlane
                    className="action-icon"
                    title="Enviar"
                    onClick={() => handleSend(doc)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {selectedDocument && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <div className="modal-body">
              <FaFilePdf className="modal-icon" />
              <p>¿Deseas enviar este PDF para continuar con tu práctica profesional?</p>
              <p>{selectedDocument.file.name}</p>
              <button className="confirm-button" onClick={handleConfirmSend}>Enviar a asesor interno</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Documentos;
