import {useState} from 'react'
import axios from 'axios'
import{Navigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import Error from './common/Error'
import md5 from 'md5'


import Titulo from './common/Titulo'
const Login = () => {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)
  const [goMisOfertas,setGoMisOfertas] = useState(false)


  const login = async (e) => {
    e.preventDefault()

    
    //validar 
    if([email,password].includes('') || [email,password].includes('#')){
      setError(true)
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Debe llenar todos los campos",
        showConfirmButton: false,
        timer: 1500
      })
      return
    }else setError(false)

    setLoading(true)
    try{
      const { data } = await axios.post(
        `login`,
        {
          email,
          password
        }
      )
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        html: `Bienvenido/a <strong>${data.company}</strong>`,
        showConfirmButton: false,
        timer: 2000
      })
      let dataCom = {email}
      dataCom.id = await data.company_id
      dataCom.company = await data.company
      dataCom.username = await data.username
      dataCom.email = await data.email
      dataCom.logo = await data.logo
      const idSession = await md5(dataCom.id+dataCom.email+dataCom.username)
      localStorage.setItem('user',JSON.stringify(dataCom))
      localStorage.setItem('idSession',idSession)
      setGoMisOfertas(true)
    }catch(err){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message.includes('401')?'Datos de acceso incorrectos': err.message,
        showConfirmButton: false,
        timer: 3000
      })
    }

  }

  if(goMisOfertas){
    return <Navigate to="/misOfertas" />
  }

  return (
    <>
    <Titulo titulo='Iniciar sesión'/>
    <form onSubmit={login}>
        <div className="container">
          <div className="row">
            
            <div className="col-md">
              <img width="100%" src="./../../public/slider/slide1.jpg" alt="" />
              <p>Accede a nuestra comunidad de talento y haz un seguimiento de tus candidaturas</p>
              <p>Aplica a todas nuestras ofertas sin tener que repetir tu información una y otra vez</p>
              <p>Mantente informado de nuevas ofertas que sean de tu interés</p>
            </div>
            <div className="col-md">
              <div className="card border mb-3">
                <div className="card-body">
                  <h5 className="card-title text-center">Ingrese los datos</h5>
                  
                  <div className="mb-3 text-center"><img id="logo" width='150px' src="./../../public/vite.svg" alt="" /></div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      aria-describedby="emailHelp"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                  </div>

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-success me-md-2" type="submit">
                      Acceder
                    </button>
                   
                  </div>
                  {error && <Error mensaje='Todos los campos son obligatorios' />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login