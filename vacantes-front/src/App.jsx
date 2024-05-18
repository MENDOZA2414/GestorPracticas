import Login from "./components/Login"
import Ofertas from "./components/Ofertas"
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import { Register } from "./components/Register"

const App = () => {
  return (
    <BrowserRouter>

    <nav className="py-2 bg-body-tertiary border-bottom">
        <div className="container d-flex flex-wrap">
          <ul className="nav me-auto">
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2 active" aria-current="page">Home</a></li>
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">Features</a></li>
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">Pricing</a></li>
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">FAQs</a></li>
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">About</a></li>
          </ul>
          <ul className="nav">
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">Login</a></li>
            <li className="nav-item"><a href="#" className="nav-link link-body-emphasis px-2">Sign up</a></li>
          </ul>
        </div>
      </nav>
      <header className="py-3 mb-4 border-bottom">
    <div className="container d-flex flex-wrap justify-content-center">
      <a href="/" className="d-flex align-items-center mb-3 mb-lg-0 me-lg-auto link-body-emphasis text-decoration-none">
        <img src="./../public/vite.svg" className="bi me-2" width="40" height="32"/>
        <span className="fs-4">Double header</span>
      </a>
    </div>
  </header>

    <div className="container">
      <Routes>
        <Route path="/" element={<Ofertas/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </div>  
      
    </BrowserRouter>
  )
}

export default App