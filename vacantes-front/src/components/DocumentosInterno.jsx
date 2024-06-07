import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { FaFolder, FaCheck, FaTimes } from 'react-icons/fa';
import { TbArrowBigLeftLineFilled } from "react-icons/tb";
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
                if (response.data.length === 0) {
                    throw new Error('No students found');
                }
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setStudents([
                    { numControl: 1, nombre: 'Juan Pérez', turno: 'TM', carrera: 'IDS', fotoPerfil: 'path/to/default/photo1.jpg' },
                    { numControl: 2, nombre: 'Ana Gómez', turno: 'TV', carrera: 'ITC', fotoPerfil: 'path/to/default/photo2.jpg' },
                    { numControl: 3, nombre: 'Luis Martínez', turno: 'TM', carrera: 'IDS', fotoPerfil: 'path/to/default/photo3.jpg' },
                ]);
            }
        };
        fetchStudents();
    }, []);

    const handleFolderClick = async (studentId) => {
        try {
            console.log(`Clicked on student with ID: ${studentId}`);
            const response = await axios.get(`http://localhost:3001/documentoAlumnoRegistrado/${studentId}`);
            setPendingDocuments(response.data.filter(doc => !doc.aprobado));
            setApprovedDocuments(response.data.filter(doc => doc.aprobado));
            setSelectedStudent(studentId);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setPendingDocuments([
                { id: 1, nombreArchivo: 'Documento1.pdf' },
                { id: 2, nombreArchivo: 'Documento2.pdf' },
            ]);
            setApprovedDocuments([
                { id: 3, nombreArchivo: 'Documento3.pdf' },
            ]);
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

    return (
        <div className="documentos-interno">
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
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
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
                <button onClick={confirmAction}>Confirmar</button>
                <button onClick={closeModal}>Cancelar</button>
            </Modal>
        </div>
    );
};

export default DocumentosInterno;
