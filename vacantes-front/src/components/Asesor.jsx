import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './asesor.css';

const Asesor = () => {
  const [asesorInterno, setAsesorInterno] = useState(null);
  const [asesorExterno, setAsesorExterno] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseInterno = await axios.get('http://localhost:3001/asesor/interno');
        setAsesorInterno(responseInterno.data);
      } catch (error) {
        console.error('Error fetching data for Asesor Interno:', error);
        setAsesorInterno({
          foto: 'https://via.placeholder.com/150',
          nombre: 'Nombre',
          apellidoPaterno: 'ApellidoPaterno',
          apellidoMaterno: 'ApellidoMaterno',
          correo: 'nombre.apellido@example.com',
          numCelular: '123-456-7890',
        });
      }

      try {
        const responseExterno = await axios.get('http://localhost:3001/asesor/externo');
        setAsesorExterno(responseExterno.data);
      } catch (error) {
        console.error('Error fetching data for Asesor Externo:', error);
        setAsesorExterno({
          foto: 'https://via.placeholder.com/150',
          nombre: 'Nombre',
          apellidoPaterno: 'ApellidoPaterno',
          apellidoMaterno: 'ApellidoMaterno',
          correo: 'nombre.apellido@example.com',
          numCelular: '123-456-7890',
        });
      }
    };
    fetchData();
  }, []);

  if (!asesorInterno || !asesorExterno) return <div>Loading...</div>;

  return (
    <div className="asesor-container">
      <div className="asesor-card">
        <img src={asesorInterno.foto} alt="Foto del Asesor Interno" className="asesor-foto" />
        <div className="asesor-info">
          <h1>Asesor Interno</h1>
          <h2>{`${asesorInterno.nombre} ${asesorInterno.apellidoPaterno} ${asesorInterno.apellidoMaterno}`}</h2>
          <div className="asesor-info-grid">
            <div>
              <p><strong>Correo Electrónico:</strong></p>
              <p>{asesorInterno.correo}</p>
            </div>
            <div>
              <p><strong>Número Celular:</strong></p>
              <p>{asesorInterno.numCelular}</p>
            </div>
          </div>
          <button className="contact-button">Contactar</button>
        </div>
      </div>
      <div className="asesor-card">
        <img src={asesorExterno.foto} alt="Foto del Asesor Externo" className="asesor-foto" />
        <div className="asesor-info">
          <h1>Asesor Externo</h1>
          <h2>{`${asesorExterno.nombre} ${asesorExterno.apellidoPaterno} ${asesorExterno.apellidoMaterno}`}</h2>
          <div className="asesor-info-grid">
            <div>
              <p><strong>Correo Electrónico:</strong></p>
              <p>{asesorExterno.correo}</p>
            </div>
            <div>
              <p><strong>Número Celular:</strong></p>
              <p>{asesorExterno.numCelular}</p>
            </div>
          </div>
          <button className="contact-button">Contactar</button>
        </div>
      </div>
    </div>
  );
};

export default Asesor;
