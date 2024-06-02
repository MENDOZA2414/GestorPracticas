import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './asesor.css';

const PerfilAsesorInterno = ({ asesorInternoID }) => {
  const [asesorInterno, setAsesorInterno] = useState(null);

  useEffect(() => {
    const fetchAsesorInternoData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/asesorInterno/${asesorInternoID}`);
        setAsesorInterno(response.data);
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
    };
    fetchAsesorInternoData();
  }, [asesorInternoID]);

  if (!asesorInterno) return <div>Loading...</div>;

  return (
    <div className="asesor-card">
      <img src={`data:image/jpeg;base64,${asesorInterno.fotoPerfil}`} alt="Foto del Asesor Interno" className="asesor-foto" />
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
  );
};

export default PerfilAsesorInterno;
