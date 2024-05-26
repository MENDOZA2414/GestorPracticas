import PropTypes from 'prop-types';

const ListaPostulaciones = ({ postulaciones }) => {
    if (!Array.isArray(postulaciones) || postulaciones.length === 0) {
        return <p>No hay postulaciones disponibles.</p>;
    }

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Cargo</th>
                    <th scope="col">Foto</th>
                    <th scope="col">Postulados</th>
                    <th scope="col">DNI</th>
                    <th scope="col">EMAIL</th>
                </tr>
            </thead>
            <tbody>
                {postulaciones.map((item, index) => (
                    <tr key={index}>
                        <td>{item.title}</td>
                        <td>
                            <img 
                                src={item.img || 'path/to/default/image.png'} 
                                width={50} 
                                height={50} 
                                alt={`Foto de ${item.name}`} 
                                onError={(e) => { e.target.src = 'path/to/default/image.png'; }}
                            />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.dni}</td>
                        <td>{item.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

ListaPostulaciones.propTypes = {
    postulaciones: PropTypes.arrayOf(
        PropTypes.shape({
            job_id: PropTypes.number,
            title: PropTypes.string.isRequired,
            img: PropTypes.string,
            name: PropTypes.string.isRequired,
            dni: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ListaPostulaciones;
