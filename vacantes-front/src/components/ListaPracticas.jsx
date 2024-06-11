import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import './listaPracticas.css';

const ListaPracticas = ({ entidadID }) => {
    const [practicas, setPracticas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPracticas = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/practicas/${entidadID}`);
                setPracticas(response.data);
            } catch (error) {
                setError('Error fetching practicas: ' + error.message);
            }
        };
        if (entidadID) {
            fetchPracticas();
        }
    }, [entidadID]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!practicas.length) {
        return <p>No hay prácticas profesionales disponibles.</p>;
    }

    return (
        <div className="pract-enti-card">
            <h2>Prácticas Profesionales</h2>
            <div className="pract-enti-table-wrapper">
                <table className="pract-enti-table">
                    <thead>
                        <tr>
                            <th>No. de Práctica</th>
                            <th>Título de la Vacante</th>
                            <th>Nombre Completo del Alumno</th>
                            <th>Nombre Completo del Asesor Externo</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {practicas.map((practica, index) => (
                            <tr key={practica.practicaID}>
                                <td>{index + 1}</td>
                                <td>{practica.tituloVacante}</td>
                                <td>{`${practica.nombreAlumno} ${practica.apellidoAlumno}`}</td>
                                <td>{`${practica.nombreAsesorExterno} ${practica.apellidoAsesorExterno}`}</td>
                                <td>{new Date(practica.fechaInicio).toLocaleDateString()}</td>
                                <td>{new Date(practica.fechaFin).toLocaleDateString()}</td>
                                <td>{practica.estado}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ListaPracticas.propTypes = {
    entidadID: PropTypes.number.isRequired,
};

export default ListaPracticas;

