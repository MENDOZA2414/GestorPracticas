import Ofertas from "./components/Ofertas"
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Ofertas" element={<Ofertas/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App