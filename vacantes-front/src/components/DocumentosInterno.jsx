import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFolder, FaCheck } from 'react-icons/fa';
import './documentosInterno.css';

const DocumentosInterno = () => {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('Nombre');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('http://localhost:3001/alumnos'); // Reemplaza con la ruta correcta
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
            setDocuments(response.data);
            setSelectedStudent(studentId);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleApprove = (documentId) => {
        alert(`Documento ${documentId} aprobado`);
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
                <input
                    type="text"
                    placeholder={`Buscar por ${searchCriteria.toLowerCase()}`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select
                    value={searchCriteria}
                    onChange={(e) => setSearchCriteria(e.target.value)}
                >
                    <option value="Nombre">Nombre</option>
                    <option value="Carrera">Carrera</option>
                    <option value="Turno">Turno</option>
                </select>
            </div>
            <div className="cards-container">
                {!selectedStudent && filteredStudents.map(student => (
                    <div className="student-card" key={student.id}>
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
                <div className="documents-list">
                    <h3>Documentos del Alumno</h3>
                    <ul>
                        {documents.map(doc => (
                            <li key={doc.id}>
                                <div className="document-name">{doc.nombreArchivo}</div>
                                <div className="document-actions">
                                    <FaCheck className="approve-icon" onClick={() => handleApprove(doc.id)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DocumentosInterno;
