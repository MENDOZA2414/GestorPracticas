import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './asesor.css';

const Asesor = () => {
  const [asesorInterno, setAsesorInterno] = useState(null);
  const [asesorExterno, setAsesorExterno] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const numControl = storedUser ? storedUser.id : null;

        if (!numControl) {
          throw new Error('No se encontró el número de control del alumno logueado');
        }

        // Obtener datos del alumno
        const responseAlumno = await axios.get(`http://localhost:3001/alumno/${numControl}`);
        const alumnoData = responseAlumno.data;
        console.log('Datos del alumno:', alumnoData);

        if (!alumnoData.asesorInternoID) {
          throw new Error('El alumno no tiene asesor interno asignado.');
        }

        // Obtener datos del asesor interno
        const responseInterno = await axios.get(`http://localhost:3001/asesorInterno/${alumnoData.asesorInternoID}`);
        const asesorInternoData = responseInterno.data;
        asesorInternoData.foto = `data:image/jpeg;base64,${asesorInternoData.fotoPerfil}`;
        setAsesorInterno(asesorInternoData);
        console.log('Datos del asesor interno:', responseInterno.data);

        // Obtener la práctica profesional del alumno
        const responsePractica = await axios.get(`http://localhost:3001/practicaProfesional/alumno/${numControl}`);
        const practicaData = responsePractica.data;

        // Obtener datos del asesor externo
        const responseExterno = await axios.get(`http://localhost:3001/asesorExterno/${practicaData.asesorExternoID}`);
        const asesorExternoData = responseExterno.data;
        asesorExternoData.foto = `data:image/jpeg;base64,${asesorExternoData.fotoPerfil}`;
        setAsesorExterno(asesorExternoData);
        console.log('Datos del asesor externo:', responseExterno.data);

      } catch (error) {
        console.error('Error fetching data:', error);
        if (!asesorInterno) {
          setAsesorInterno({
            foto: 'https://via.placeholder.com/150',
            nombre: 'Nombre',
            apellidoPaterno: 'ApellidoPaterno',
            apellidoMaterno: 'ApellidoMaterno',
            correo: 'nombre.apellido@example.com',
            numCelular: '123-456-7890',
          });
        }
        if (!asesorExterno) {
          setAsesorExterno({
            foto: 'https://via.placeholder.com/150',
            nombre: 'Nombre',
            apellidoPaterno: 'ApellidoPaterno',
            apellidoMaterno: 'ApellidoMaterno',
            correo: 'nombre.apellido@example.com',
            numCelular: '123-456-7890',
          });
        }
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
