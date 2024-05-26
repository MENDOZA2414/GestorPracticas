import PropTypes from 'prop-types';

const ListaVacantes = ({ setSelected_job, vacantes, pagina, setPagina, setVacante, setEliminar }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Título</th>
          <th scope="col">Tipo</th>
          <th scope="col">Ubicación</th>
          <th scope="col">Experiencia</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {pagina === 1 && vacantes.length === 0 ? (
          <tr>
            <td colSpan={5} className="text-center">Sin vacantes registradas</td>
          </tr>
        ) : (
          vacantes.map((item) => (
            <tr key={item.job_id}>
              <td>{item.title}</td>
              <td>{item.job_type}</td>
              <td>{item.city}</td>
              <td>{item.experience}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setVacante(item)}
                  aria-label={`Editar vacante ${item.title}`}
                >
                  E
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setEliminar(item.job_id)}
                  aria-label={`Eliminar vacante ${item.title}`}
                >
                  -
                </button>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setSelected_job(item.job_id)}
                  aria-label={`Ver vacante ${item.title}`}
                >
                  V
                </button>
              </td>
            </tr>
          ))
        )}
        {!(pagina === 1 && vacantes.length === 0) && (
          <tr>
            <td colSpan={5}>
              <nav aria-label="Navegación de página">
                <ul className="pagination justify-content-center">
                  {pagina === 1 ? (
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Primera</a>
                    </li>
                  ) : (
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={() => setPagina(1)}>Primera</a>
                    </li>
                  )}
                  {pagina > 1 && (
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={() => setPagina(pagina - 1)}>{pagina - 1}</a>
                    </li>
                  )}
                  <li className="page-item active" aria-current="page">
                    <a className="page-link" href="#">{pagina}</a>
                  </li>
                  {vacantes.length >= 5 && (
                    <>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPagina(pagina + 1)}>{pagina + 1}</a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={() => setPagina(pagina + 1)}>Siguiente</a>
                      </li>
                    </>
                  )}
                  {vacantes.length < 5 && (
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Siguiente</a>
                    </li>
                  )}
                </ul>
              </nav>
            </td>
          </tr>
        )}
      </tbody>
    </table>
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
  pagina: PropTypes.number.isRequired,
  setPagina: PropTypes.func.isRequired,
  setVacante: PropTypes.func.isRequired,
  setEliminar: PropTypes.func.isRequired,
};

export default ListaVacantes;
