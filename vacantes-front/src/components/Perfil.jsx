import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './perfil.css';
import moment from 'moment';
import imageCompression from 'browser-image-compression';

const Perfil = () => {
  const [alumno, setAlumno] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    foto: '',
    numControl: '',
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaNacimiento: '',
    carrera: '',
    semestre: '',
    turno: '',
    correo: '',
    numCelular: '',
    fotoFile: null,
  });

  const defaultImage = 'ruta/a/imagen/predeterminada.png'; // Cambia esta ruta por la de tu imagen predeterminada

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const numControl = storedUser ? storedUser.id : null;

        if (!numControl) {
          throw new Error('No se encontró el número de control del alumno logueado');
        }

        const response = await axios.get(`http://localhost:3001/alumno/${numControl}`);
        const alumnoData = response.data;
        alumnoData.foto = alumnoData.fotoPerfil ? `data:image/jpeg;base64,${alumnoData.fotoPerfil}` : defaultImage;
        alumnoData.fechaNacimiento = moment(alumnoData.fechaNacimiento).format('YYYY-MM-DD');
        setAlumno(alumnoData);
        setFormValues(alumnoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' && files.length > 0) {
      const file = files[0];
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 500,
        useWebWorker: true
      };

      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormValues({ ...formValues, foto: reader.result, fotoFile: compressedFile });
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error al comprimir la imagen:', error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: "Error al comprimir la imagen",
          showConfirmButton: false,
          timer: 1500
        });
      }
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const handleSave = async () => {
    const requiredFields = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'fechaNacimiento', 'carrera', 'semestre', 'turno', 'correo', 'numCelular'];
    for (let field of requiredFields) {
      if (!formValues[field]) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No se admiten campos vacíos',
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    }

    try {
      const formData = new FormData();
      Object.keys(formValues).forEach(key => {
        if (key !== 'foto' && key !== 'fotoFile') {
          formData.append(key, formValues[key]);
        }
      });
      if (formValues.fotoFile) {
        formData.append('foto', formValues.fotoFile);
      }

      if (formValues.fechaNacimiento) {
        const date = new Date(formValues.fechaNacimiento);
        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        formData.set('fechaNacimiento', formattedDate);
      }

      await axios.put(`http://localhost:3001/alumno/${formValues.numControl}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedAlumno = { ...formValues, foto: formValues.fotoFile ? URL.createObjectURL(formValues.fotoFile) : formValues.foto };
      setAlumno(updatedAlumno);
      setEditing(false);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Perfil actualizado con éxito',
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error saving data:', error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Error al guardar los datos. Intenta nuevamente.',
        showConfirmButton: false,
        timer: 3000,
      });
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
          <input type="file" name="foto" onChange={handleChange} className="form-control mb-3" />
          <div className="perfil-form">
            <input type="text" name="numControl" value={formValues.numControl} onChange={handleChange} placeholder="Número de Control" readOnly className="form-control mb-3" disabled />
            <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} placeholder="Nombre" className="form-control mb-3" />
            <input type="text" name="apellidoPaterno" value={formValues.apellidoPaterno} onChange={handleChange} placeholder="Apellido Paterno" className="form-control mb-3" />
            <input type="text" name="apellidoMaterno" value={formValues.apellidoMaterno} onChange={handleChange} placeholder="Apellido Materno" className="form-control mb-3" />
            <input type="date" name="fechaNacimiento" value={formValues.fechaNacimiento} onChange={handleChange} className="form-control mb-3" />
            <select name="carrera" value={formValues.carrera} onChange={handleChange} className="form-control mb-3">
              <option value="IDS">IDS</option>
              <option value="ITC">ITC</option>
              <option value="LATI">LATI</option>
              <option value="LITI">LITI</option>
            </select>
            <select name="semestre" value={formValues.semestre} onChange={handleChange} className="form-control mb-3">
              {Array.from({ length: 9 }, (_, i) => i + 1).map(sem => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
            <select name="turno" value={formValues.turno} onChange={handleChange} className="form-control mb-3">
              <option value="TM">TM</option>
              <option value="TV">TV</option>
            </select>
            <input type="email" name="correo" value={formValues.correo} onChange={handleChange} placeholder="Correo Electrónico" className="form-control mb-3" />
            <input type="text" name="numCelular" value={formValues.numCelular} onChange={handleChange} placeholder="Número Celular" className="form-control mb-3" />
            <div className="perfil-buttons">
              <button onClick={handleSave} className="btn btn-primary me-2">Guardar</button>
              <button onClick={handleCancel} className="btn btn-secondary cancel-button">Cancelar</button>
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
                <p>{alumno.numControl}</p>
              </div>
              <div>
                <p><strong>Fecha de Nacimiento:</strong></p>
                <p>{moment(alumno.fechaNacimiento).format('DD/MM/YYYY')}</p>
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
                <p>{alumno.correo}</p>
              </div>
              <div className="perfil-celular">
                <p><strong>Número Celular:</strong></p>
                <p>{alumno.numCelular}</p>
              </div>
            </div>
            <button onClick={handleEdit} className="btn btn-primary">Editar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Perfil;
