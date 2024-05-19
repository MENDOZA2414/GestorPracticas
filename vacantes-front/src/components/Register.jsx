import React, { useState } from "react";
import Titulo from "./common/Titulo";
import axios from 'axios';
import Swal from 'sweetalert2'

export const Register = () => {

  const [logo, setLogo] = useState()
  const [company, setCompany] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)


  const prevLogo = (e) => {
    e.preventDefault();
    let lector = new FileReader()
    lector.readAsDataURL(e.target.files[0])
    lector.onload = () => {
      document.getElementById('logo').src = lector.result
      setLogo(lector.result)
    }
  }

  const registro = async(e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const { data } = await axios.post(
        `comapany`,
        {
          logo,
          company,
          username,
          email,
          password,
        }
      )
      Swal.fire({
        position: "top-end",
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      })
    }catch(err){
      Swal.fire({
        position: "top-end",
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  return (
    <>
      <Titulo titulo={"Registro de emp resas"} />
      <form onSubmit={registro}>
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
                  <div className="mb-3 text-center" ><img id="logo" width='150px' src="./../../public/vite.svg" alt="" /></div>
                  <div className="mb-3">
                    <label className="form-label">
                      Logo de la empresa
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={prevLogo}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Nombre de la empresa
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e)=> setCompany(e.target.value) }
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
                      onChange={(e)=> setUsername(e.target.value) }
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
                      onChange={(e)=> setEmail(e.target.value) }
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
                      onChange={(e)=> setPassword(e.target.value) }
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
                      onChange={(e)=> setPasswordConfirm(e.target.value) }
                    />
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-success me-md-2" type="submit">Crear cuenta empresa</button>
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
