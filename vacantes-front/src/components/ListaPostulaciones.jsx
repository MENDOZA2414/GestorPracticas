import PropTypes from 'prop-types';
import { FaFilePdf, FaCheck, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './lista-postu.css';

const ListaPostulaciones = ({ postulaciones, handleApprove, handleReject }) => {
    if (!Array.isArray(postulaciones) || postulaciones.length === 0) {
        return <p>No hay postulaciones disponibles.</p>;
    }

    const confirmApprove = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                handleApprove(id);
            }
        });
    };

    return (
        <div className="lista-postu-table-container">
            <table className="lista-postu-table">
                <thead>
                    <tr>
                        <th scope="col">Título de la Vacante</th>
                        <th scope="col">Nombre Completo</th>
                        <th scope="col">Correo</th>
                        <th scope="col">Carta de Presentación</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {postulaciones.map((item, index) => (
                        <tr key={index}>
                            <td data-label="Título de la Vacante">{item.vacanteTitulo}</td>
                            <td data-label="Nombre Completo">{item.nombreAlumno}</td>
                            <td data-label="Correo">{item.correoAlumno}</td>
                            <td data-label="Carta de Presentación">
                                <a 
                                  href={`http://localhost:3001/postulacionalumno/${item.id}`} 
                                  className="lista-postu-link" 
                                  target="_blank" 
                                  rel="noopener noreferrer">
                                    <FaFilePdf className="lista-postu-icon" />
                                </a>
                            </td>
                            <td data-label="Acciones">
                                <button className="lista-postu-button approve" onClick={() => confirmApprove(item.id)}>
                                    <FaCheck />
                                </button>
                                <button className="lista-postu-button reject" onClick={() => handleReject(item.id)}>
                                    <FaTimes />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

ListaPostulaciones.propTypes = {
    postulaciones: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            vacanteTitulo: PropTypes.string.isRequired,
            nombreAlumno: PropTypes.string.isRequired,
            correoAlumno: PropTypes.string.isRequired,
        })
    ).isRequired,
    handleApprove: PropTypes.func.isRequired,
    handleReject: PropTypes.func.isRequired
};

export default ListaPostulaciones;
