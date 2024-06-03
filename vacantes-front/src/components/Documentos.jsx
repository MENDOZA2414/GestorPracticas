import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaEye, FaDownload, FaPaperPlane, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './documentos.css';

const Documentos = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDocument, setSelectedDocument] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const numControl = storedUser ? storedUser.id : null;

                if (!numControl) {
                    throw new Error('No se encontró el número de control del alumno logueado');
                }

                const response = await axios.get(`http://localhost:3001/documentosAlumno/${numControl}`);
                setDocuments(response.data);
                if (response.data.length === 0) {
                    setError('No se encontraron documentos.');
                }
            } catch (error) {
                setError('Error fetching documents');
            } finally {
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const numControl = storedUser ? storedUser.id : null;

        if (file && file.type === 'application/pdf' && numControl) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('alumnoID', numControl);
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
                setError(null); // Clear error if new document is uploaded
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error uploading file',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
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

    const handleView = (id) => {
        if (id) {
            window.open(`http://localhost:3001/documentoAlumno/${id}`, '_blank');
        }
    };

    const handleDownload = (id, nombreArchivo) => {
        if (id) {
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
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: "No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar!',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3001/documentoAlumno/${id}`);
                setDocuments(documents.filter(doc => doc.id !== id));
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Documento eliminado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                });
            } catch (error) {
                console.error('Error deleting file:', error);
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error al eliminar el documento',
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        }
    };

    const handleSend = (doc) => {
        setSelectedDocument(doc);
    };

    const handleCloseModal = () => {
        setSelectedDocument(null);
    };

    const handleConfirmSend = () => {
        alert(`Enviando el documento: ${selectedDocument.nombreArchivo}`);
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
                    {loading ? (
                        <p>Cargando...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <ul>
                            {documents.map((doc) => (
                                <li key={doc.id}>
                                    <div className="document-name">{doc.nombreArchivo}</div>
                                    <div className="document-actions">
                                        <FaEye className="action-icon" title="Ver" onClick={() => handleView(doc.id)} />
                                        <FaDownload className="action-icon" title="Descargar" onClick={() => handleDownload(doc.id, doc.nombreArchivo)} />
                                        <FaPaperPlane className="action-icon" title="Enviar" onClick={() => handleSend(doc)} />
                                        <h5 className='barrita'>|</h5>
                                        <FaTrash className="action-icon trash-icon" title="Eliminar" onClick={() => handleDelete(doc.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {selectedDocument && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleCloseModal}>&times;</span>
                        <div className="modal-body">
                            <FaFilePdf className="modal-icon" />
                            <p>¿Deseas enviar este PDF para continuar con tu práctica profesional?</p>
                            <p>{selectedDocument.nombreArchivo}</p>
                            <button className="confirm-button" onClick={handleConfirmSend}>Enviar a asesor interno</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Documentos;
