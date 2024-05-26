import React from 'react';
import Titulo from './common/Titulo';

const Principal = () => {
    return (
        <>
            <div className="mt-5">
                <Titulo titulo={
                    <>
                        La <span className="highlight">gestión de prácticas</span> del DASC bajo control
                    </>
                } />
            </div>
            <p className="fs-5 text-body-secondary text-center mb-5">
                Simplificamos y unificamos los procesos de prácticas profesionales de nuestro departamento para que ganes tiempo, seguridad y tranquilidad.
            </p>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="card mb-3 flex-fill custom-card">
                            <div className="card-body">
                                <h5 className="card-title text-center">¿Qué son las prácticas profesionales?</h5>
                                <p className="card-text text-justify">
                                    Las Prácticas Profesionales son actividades curriculares que el alumnado del DASC realiza en alguna organización pública, privada o social, con el propósito de consolidar y complementar el desarrollo de sus competencias y conocimientos adquiridos en su formación académica.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center">
                        <div className="card mb-3 flex-fill custom-card">
                            <div className="card-body">
                                <h5 className="card-title text-center">Su objetivo</h5>
                                <p className="card-text text-justify">
                                    Las prácticas Profesionales tienen como objetivo general que los alumnos pongan en práctica los conocimientos adquiridos en el transcurso de su formación profesional.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary ">
                    <div className="col-lg-7 px-0">
                        <h1 className="display-4 fst-medium">Una plataforma moderna y actualizada para los alumnos</h1>
                        <p className="lead my-3">Creada por y para alumnos, esta herramienta cumple un rol importante en el proceso académico de cada alumno del departamento.</p>
                        <p className="lead mb-0"><a href="#" className="text-body-emphasis fw-bold">Continua leyendo...</a></p>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-primary-emphasis">World</strong>
                                <h3 className="mb-0">Featured post</h3>
                                <div className="mb-1 text-body-secondary">Nov 12</div>
                                <p className="card-text mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                                    Continue reading
                                    <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
                                </a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <strong className="d-inline-block mb-2 text-success-emphasis">Design</strong>
                                <h3 className="mb-0">Post title</h3>
                                <div className="mb-1 text-body-secondary">Nov 11</div>
                                <p className="mb-auto">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                                <a href="#" className="icon-link gap-1 icon-link-hover stretched-link">
                                    Continue reading
                                    <svg className="bi"><use xlink:href="#chevron-right"></use></svg>
                                </a>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <svg className="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <style jsx>{`
        .highlight {
          color: #2724B3;
        }
        .custom-card {
          border-radius: 20px;
          max-width: 600px;
          display: flex;
          flex-direction: column;
        }
        .custom-card .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding: 2rem; /* Añadir más espacio interno */
        }
        .custom-card .card-title {
          margin-bottom: 15px; /* Ajustar espacio entre título y párrafo */
        }
        .custom-card .card-text {
          text-align: justify;
        }
      `}</style>
        </>
    );
}

export default Principal;
