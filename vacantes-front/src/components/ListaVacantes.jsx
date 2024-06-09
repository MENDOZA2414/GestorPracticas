import PropTypes from 'prop-types';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importa íconos de react-icons

const ListaVacantes = ({ setSelected_job, vacantes, setVacante, setEliminar }) => {
  return (
    <div className="vacantes-lista">
      {vacantes.length === 0 ? (
        <p className="text-center">Sin vacantes registradas</p>
      ) : (
        vacantes.map((item) => (
          <div key={item.job_id} className="vacante-item">
            <div className="vacante-info">
              <span>{item.title}</span>
              <span>{item.job_type}</span>
              <span>{item.city}</span>
              <span>{item.experience} años</span>
            </div>
            <div className="vacante-actions">
              <button onClick={() => setSelected_job(item.job_id)} aria-label={`Ver vacante ${item.title}`}>
                <FaEye />
              </button>
              <button onClick={() => setVacante(item)} aria-label={`Editar vacante ${item.title}`}>
                <FaEdit />
              </button>
              <button onClick={() => setEliminar(item.job_id)} aria-label={`Eliminar vacante ${item.title}`}>
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

ListaVacantes.propTypes = {
  setSelected_job: PropTypes.func.isRequired,
  vacantes: PropTypes.arrayOf(
    PropTypes.shape({
      job_id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      job_type: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      experience: PropTypes.string.isRequired,
    })
  ).isRequired,
  setVacante: PropTypes.func.isRequired,
  setEliminar: PropTypes.func.isRequired,
};

export default ListaVacantes;
