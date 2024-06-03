import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilePdf, FaEye, FaDownload, FaPaperPlane, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './documentos.css';

const Documentos = () => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/documentosAlumno/1235767');
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
                                        <FaPaperPlane className="action-icon" title="Enviar" />
                                        <FaTrash className="action-icon" title="Eliminar" onClick={() => handleDelete(doc.id)} />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Documentos;
