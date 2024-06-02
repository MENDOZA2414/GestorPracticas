import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaEye, FaDownload, FaPaperPlane } from 'react-icons/fa';
import './documentos.css';

const Documentos = () => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/documentosAlumno/1235767');
                setDocuments(response.data);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };
        fetchDocuments();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('alumnoID', '1235767');
            formData.append('nombreArchivo', file.name);

            try {
                const response = await axios.post('http://localhost:3001/uploadDocumentoAlumno', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const newDocument = {
                    file: file,
                    nombreArchivo: file.name,
                    id: response.data.documentoID,
                };
                setDocuments([...documents, newDocument]);
                alert(response.data.message);
            } catch (error) {
                console.error('Error uploading file:', error);
                alert('Error uploading file');
            }
        } else {
            alert('Por favor, sube solo archivos PDF.');
        }
    };

    const handleView = (id) => {
        window.open(`http://localhost:3001/documentoAlumno/${id}`, '_blank');
    };

    const handleDownload = (id, nombreArchivo) => {
        axios.get(`http://localhost:3001/documentoAlumno/${id}`, {
            responseType: 'blob',
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', nombreArchivo);
            document.body.appendChild(link);
            link.click();
            link.remove();
        }).catch((error) => {
            console.error('Error downloading file:', error);
        });
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
                        {documents.map((doc) => (
                            <li key={doc.id}>
                                <div className="document-name">{doc.nombreArchivo}</div>
                                <div className="document-actions">
                                    <FaEye className="action-icon" title="Ver" onClick={() => handleView(doc.id)} />
                                    <FaDownload className="action-icon" title="Descargar" onClick={() => handleDownload(doc.id, doc.nombreArchivo)} />
                                    <FaPaperPlane className="action-icon" title="Enviar" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Documentos;
