import React from "react";

const ListaVacantes = ({ setSelected_job,vacantes,pagina,setPagina, setVacante,setEliminar }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Titulo</th>
          <th scope="col">Tipo</th>
          <th scope="col">Ubicación</th>
          <th scope="col">Experiencia</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {vacantes.map((item) => {
          return (
            <tr key={item.job_id}>
              <td>{item.title}</td>
              <td>{item.job_type}</td>
              <td>{item.city}</td>
              <td>{item.experience}</td>
              <td>
              <button
                  type="button"
                  class="btn btn-info"
                  onClick={() => setVacante(item)}
                >
                  E
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  onClick={() => {
                    setEliminar(item.job_id)
                  }
                }
                >
                  -
                </button>
                <button
                  type="button"
                  class="btn btn-info"
                  onClick={() => {
                    setSelected_job(item.job_id)
                  }
                }
                >
                  V
                </button>
              </td>
            </tr>
          );
        })}

        <tr>
          <td colSpan={5}>
            <nav aria-label="...">
              <ul className="pagination justify-content-center">
                {
                    pagina === 1?
                    <li className="page-item disabled"><a className="page-link">Primera</a></li>
                    :
                    <li className="page-item"><a className="page-link" onClick={()=> setPagina(1)} >Primera</a></li>
                }
                {
                    pagina > 1 &&
                    <li className="page-item">
                      <a className="page-link"
                      onClick={()=> setPagina(pagina - 1)}
                      >{pagina-1}</a>
                    </li>
                }

                <li className="page-item active" aria-current="page">
                  <a className="page-link">
                    {pagina}
                  </a>
                </li>
                {
                     vacantes.length<5?(<></>):(<>
                     <li className="page-item">
                        <a className="page-link" 
                        onClick={()=> setPagina(pagina+1)}
                        >
                            {pagina+1}
                        </a>
                        </li>
                     </>)
                }
                
                {
                    vacantes.length<5? <li className="page-item disabled"> <a className="page-link " > Siguiente </a> </li>
                    : <li className="page-item"> <a className="page-link" onClick={()=> setPagina(pagina+1)}> Siguiente </a> </li>
                }
                
              </ul>
            </nav>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ListaVacantes;
