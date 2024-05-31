import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './perfil.css';

const Perfil = () => {
  const [alumno, setAlumno] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    foto: '',
    numeroControl: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    carrera: '',
    semestre: '',
    turno: '',
    email: '',
    celular: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/alumno/perfil');
        setAlumno(response.data);
        setFormValues(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        const defaultData = {
          foto: 'path/to/default/photo.jpg',
          numeroControl: '1234569087',
          nombre: 'Guillermo',
          apellidoPaterno: 'Gonzales',
          apellidoMaterno: 'Cañada',
          fechaNacimiento: '2000-01-01',
          carrera: 'IDS',
          semestre: '6',
          turno: 'MT',
          email: 'guille@gmail.com',
          celular: '1234567890',
        };
        setAlumno(defaultData);
        setFormValues(defaultData);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:3001/alumno/perfil', formValues);
      setAlumno(formValues);
      setEditing(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleCancel = () => {
    setFormValues(alumno);
    setEditing(false);
  };

  if (!alumno) return <div>Loading...</div>;

  return (
    <div className="perfil-card">
      {editing ? (
        <>
          <img src={formValues.foto} alt="Foto del Alumno" className="perfil-foto" />
          <input type="file" name="foto" onChange={handleChange} />
          <div className="perfil-form">
            <input type="text" name="numeroControl" value={formValues.numeroControl} onChange={handleChange} placeholder="Número de Control" />
            <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre" />
            <input type="text" name="apellidoPaterno" value={formValues.apellidoPaterno} onChange={handleChange} placeholder="Apellido Paterno" />
            <input type="text" name="apellidoMaterno" value={formValues.apellidoMaterno} onChange={handleChange} placeholder="Apellido Materno" />
            <input type="date" name="fechaNacimiento" value={formValues.fechaNacimiento} onChange={handleChange} />
            <input type="text" name="carrera" value={formValues.carrera} onChange={handleChange} placeholder="Carrera" />
            <input type="text" name="semestre" value={formValues.semestre} onChange={handleChange} placeholder="Semestre" />
            <input type="text" name="turno" value={formValues.turno} onChange={handleChange} placeholder="Turno" />
            <input type="email" name="email" value={formValues.email} onChange={handleChange} placeholder="Correo Electrónico" />
            <input type="text" name="celular" value={formValues.celular} onChange={handleChange} placeholder="Número Celular" />
            <div className="perfil-buttons">
              <button onClick={handleSave}>Guardar</button>
              <button onClick={handleCancel} className="cancel-button">Cancelar</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <img src={alumno.foto} alt="Foto del Alumno" className="perfil-foto" />
          <div className="perfil-info">
            <h2>{`${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`}</h2>
            <div className="perfil-info-grid">
              <div>
                <p><strong>Número de Control:</strong></p>
                <p>{alumno.numeroControl}</p>
              </div>
              <div>
                <p><strong>Fecha de Nacimiento:</strong></p>
                <p>{alumno.fechaNacimiento}</p>
              </div>
              <div>
                <p><strong>Carrera:</strong></p>
                <p>{alumno.carrera}</p>
              </div>
              <div>
                <p><strong>Semestre:</strong></p>
                <p>{alumno.semestre}</p>
              </div>
              <div>
                <p><strong>Turno:</strong></p>
                <p>{alumno.turno}</p>
              </div>
              <div>
                <p><strong>Correo Electrónico:</strong></p>
                <p>{alumno.email}</p>
              </div>
              <div className="perfil-celular">
                <p><strong>Número Celular:</strong></p>
                <p>{alumno.celular}</p>
              </div>
            </div>
            <button onClick={handleEdit}>Editar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Perfil;
