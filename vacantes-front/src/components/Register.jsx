import React from 'react'
import Titulo from './common/Titulo'

export const Register = () => {
  return (
    <>
      <Titulo titulo={"Registro de empresas"} />
      <form>
        <div className="container">
          <div className="row">
            <div className="col-md">
              <img width='100%' src="./../../public/slider/slide1.jpg" alt="" />
              <p>Accede a nuestra comunidad de talento y haz un seguimiento de tus candidaturas</p>
              <p>Aplica a todas nuestras ofertas sin tener que repetir tu información una y otra vez</p>
              <p>Mantente informado de nuevas ofertas que sean de tu interés</p>
            </div>
            <div className="col-md">
              <div className="card border mb-3">
                <div className="card-body">
                  <h5 className="card-title text-center">Ingrese los datos</h5>
                  <div className="mb-3">
                    <label className="form-label">
                      Nombre de la empresa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nombre del usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Confirmar contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-success me-md-2" type="button">Crear cuenta empresa</button>
                    <button className="btn btn-primary" type="button">Cancelar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
