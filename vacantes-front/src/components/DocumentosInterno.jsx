import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaFolder, FaCheck, FaTimes, FaEye, FaDownload, FaTrash, FaUserGraduate } from 'react-icons/fa';
import { TbArrowBigLeftLineFilled } from "react-icons/tb";
import Swal from 'sweetalert2';
import './documentosInterno.css';

const DocumentosInterno = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [pendingDocuments, setPendingDocuments] = useState([]);
    const [approvedDocuments, setApprovedDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Nombre');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [actionType, setActionType] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                const asesorID = storedUser ? storedUser.id : null; // Obtén el ID del asesor logueado

                if (!asesorID) {
                    throw new Error('No se encontró el ID del asesor logueado');
                }

                const response = await axios.get(`http://localhost:3001/alumnos/${asesorID}`);
                console.log('Students data received:', response.data);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setStudents([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStudents();
    }, []);

    const handleFolderClick = async (studentId) => {
        try {
            console.log(`Clicked on student with ID: ${studentId}`);
            const responsePending = await axios.get(`http://localhost:3001/documentoAlumnoRegistrado/${studentId}`);
            const responseApproved = await axios.get(`http://localhost:3001/documentoAlumnoAprobado/${studentId}`);
            
            setPendingDocuments(responsePending.data);
            setApprovedDocuments(responseApproved.data);
            setSelectedStudent(studentId);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setPendingDocuments([]);
            setApprovedDocuments([]);
        }
    };

    const openModal = (docId, type) => {
        setSelectedDocument(docId);
        setActionType(type);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedDocument(null);
        setActionType('');
    };

    const confirmAction = async () => {
        if (actionType === 'approve') {
            await handleApprove(selectedDocument);
        } else if (actionType === 'reject') {
            await handleReject(selectedDocument);
        }
        closeModal();
    };

    const handleApprove = async (documentId) => {
        try {
            await axios.post(`http://localhost:3001/documentoAlumno/approve`, { documentId });
            setPendingDocuments(prev => prev.filter(doc => doc.id !== documentId));
            const approvedDoc = pendingDocuments.find(doc => doc.id === documentId);
            setApprovedDocuments(prev => [...prev, approvedDoc]);
        } catch (error) {
            console.error('Error approving document:', error);
        }
    };

    const handleReject = async (documentId) => {
        try {
            await axios.post(`http://localhost:3001/documentoAlumno/reject`, { documentId });
            setPendingDocuments(prev => prev.filter(doc => doc.id !== documentId));
        } catch (error) {
            console.error('Error rejecting document:', error);
        }
    };

    const handleBackClick = () => {
        setSelectedStudent(null);
    };

    const handleView = (documentId) => {
        if (documentId) {
            window.open(`http://localhost:3001/documentoAlumno/${documentId}`, '_blank');
        }
    };

    const handleDownload = (documentId, nombreArchivo) => {
        if (documentId) {
            axios.get(`http://localhost:3001/documentoAlumno/${documentId}`, {
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

    const handleDelete = async (documentId) => {
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
                await axios.delete(`http://localhost:3001/documentoAlumno/${documentId}`);
                setApprovedDocuments(approvedDocuments.filter(doc => doc.id !== documentId));
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

    const filteredStudents = students.filter(student => {
        if (searchCriteria === 'Nombre') {
            return student.nombre && student.nombre.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchCriteria === 'Carrera') {
            return student.carrera && student.carrera.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchCriteria === 'Turno') {
            return student.turno && student.turno.toLowerCase().includes(searchQuery.toLowerCase());
        }
        return false;
    });

    if (isLoading) {
      
    }

    return (
        <div className="documentos-interno">
            {students.length === 0 ? (
                <div className="no-students-message">
                    <FaUserGraduate size={150} color="#ccc" />
                    <p>Aquí se mostrarán las carpetas de tus próximos alumnos a registrar.</p>
                    <button className="register-student-button" onClick={() => window.location.href='/inicioAsesorInterno/administrar'}>Registrar nuevo alumno</button>
                </div>
            ) : (
                <>
                    <div className="search-bar">
                        {selectedStudent && (
                            <button onClick={handleBackClick} className="back-button">
                                <TbArrowBigLeftLineFilled />
                            </button>
                        )}
                        <input
                            type="text"
                            placeholder={`Buscar por ${searchCriteria.toLowerCase()}`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={selectedStudent ? 'full-border' : ''}
                        />
                        {!selectedStudent && (
                            <select
                                value={searchCriteria}
                                onChange={(e) => setSearchCriteria(e.target.value)}
                            >
                                <option value="Nombre">Nombre</option>
                                <option value="Carrera">Carrera</option>
                                <option value="Turno">Turno</option>
                            </select>
                        )}
                    </div>
                    <div className="cards-container">
                        {!selectedStudent && filteredStudents.map(student => (
                            <div className="student-card" key={student.numControl} onClick={() => handleFolderClick(student.numControl)}>
                                <img src={`http://localhost:3001/image/${student.numControl}`} alt={student.nombre} className="student-photo" />
                                <div className="student-info">
                                    <h3>{student.nombre}</h3>
                                    <div className="student-details">
                                        <p>{student.turno}</p>
                                        <p>{student.carrera}</p>
                                    </div>
                                    <div className="folder-icon-container">
                                        <FaFolder className="folder-icon" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedStudent && (
                        <div className="documents-cards-container">
                            <div className="documents-card pending-documents-card">
                                <h3>Documentos por Aprobar</h3>
                                <ul>
                                    {pendingDocuments.length === 0 ? (
                                        <p>No hay documentos aún</p>
                                    ) : (
                                        pendingDocuments.map(doc => (
                                            <li key={doc.id}>
                                                <div className="document-name">{doc.nombreArchivo}</div>
                                                <div className="document-actions">
                                                    <FaCheck className="approve-icon" onClick={() => openModal(doc.id, 'approve')} />
                                                    <FaTimes className="reject-icon" onClick={() => openModal(doc.id, 'reject')} />
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                            <div className="documents-card approved-documents-card">
                                <h3>Documentos Aprobados</h3>
                                <ul>
                                    {approvedDocuments.length === 0 ? (
                                        <p>No hay documentos aún</p>
                                    ) : (
                                        approvedDocuments.map(doc => (
                                            <li key={doc.id}>
                                                <div className="document-name">{doc.nombreArchivo}</div>
                                                <div className="document-actions">
                                                    <FaEye className="action-icon" title="Ver" onClick={() => handleView(doc.id)} />
                                                    <FaDownload className="action-icon" title="Descargar" onClick={() => handleDownload(doc.id, doc.nombreArchivo)} />
                                                    <FaTrash className="action-icon trash-icon" title="Eliminar" onClick={() => handleDelete(doc.id)} />
                                                </div>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirm Action"
                className="modal-documentosInt"
                overlayClassName="modal-documentosInt-overlay"
            >
                <h2>Confirmar Acción</h2>
                <p>¿Estás seguro de que deseas {actionType === 'approve' ? 'aprobar' : 'rechazar'} este documento?</p>
                <div className="modal-documentosInt-buttons">
                    <button onClick={confirmAction} className="modal-documentosInt-button-confirm">Confirmar</button>
                    <button onClick={closeModal} className="modal-documentosInt-button-cancel">Cancelar</button>
                </div>
            </Modal>
        </div>
    );
};

export default DocumentosInterno;
