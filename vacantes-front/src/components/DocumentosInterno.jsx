import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/alumnos');
                if (response.data.length === 0) {
                    throw new Error('No students found');
                }
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                setStudents([
                    { id: 1, name: 'Juan Pérez', turn: 'TM', career: 'IDS', photo: 'path/to/default/photo1.jpg' },
                    { id: 2, name: 'Ana Gómez', turn: 'TV', career: 'ITC', photo: 'path/to/default/photo2.jpg' },
                    { id: 3, name: 'Luis Martínez', turn: 'TM', career: 'IDS', photo: 'path/to/default/photo3.jpg' },
                ]);
            }
        };
        fetchStudents();
    }, []);

    const handleFolderClick = async (studentId) => {
        try {
            const response = await axios.get(`http://localhost:3001/documentosAlumno/${studentId}`);
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

    const handleApprove = (documentId) => {
        alert(`Documento ${documentId} aprobado`);
        // Aquí puedes agregar la lógica para mover el documento a la lista de aprobados
    };

    const handleReject = (documentId) => {
        alert(`Documento ${documentId} no aprobado`);
        // Aquí puedes agregar la lógica para manejar el rechazo del documento
    };

    const handleBackClick = () => {
        setSelectedStudent(null);
    };

    const filteredStudents = students.filter(student => {
        if (searchCriteria === 'Nombre') {
            return student.name.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchCriteria === 'Carrera') {
            return student.career.toLowerCase().includes(searchQuery.toLowerCase());
        } else if (searchCriteria === 'Turno') {
            return student.turn.toLowerCase().includes(searchQuery.toLowerCase());
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
                    <div className="student-card" key={student.id} onClick={() => handleFolderClick(student.id)}>
                        <img src={student.photo} alt={student.name} className="student-photo" />
                        <div className="student-info">
                            <h3>{student.name}</h3>
                            <div className="student-details">
                                <p>{student.turn}</p>
                                <p>{student.career}</p>
                            </div>
                            <div className="folder-icon-container" onClick={() => handleFolderClick(student.id)}>
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
                                            <FaCheck className="approve-icon" onClick={() => handleApprove(doc.id)} />
                                            <FaTimes className="reject-icon" onClick={() => handleReject(doc.id)} />
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
        </div>
    );
};

export default DocumentosInterno;
