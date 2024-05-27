import React, { useState } from "react";
import Titulo from "./common/Titulo";
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from './common/Error';
import imageCompression from 'browser-image-compression';

const RegistrarAsesor = () => {
    const [nombre, setNombre] = useState('');
    const [apellidoPaterno, setApellidoPaterno] = useState('');
    const [apellidoMaterno, setApellidoMaterno] = useState('');
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [numCelular, setNumCelular] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [error, setError] = useState(false);

    const prevFoto = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const lector = new FileReader();
            lector.readAsDataURL(compressedFile);
            lector.onload = () => {
                document.getElementById('foto').src = lector.result;
                setFotoPerfil(compressedFile);
            };
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
    };

    const limpiarCampos = () => {
        setNombre('');
        setApellidoPaterno('');
        setApellidoMaterno('');
        setCorreo('');
        setPassword('');
        setPasswordConfirm('');
        setNumCelular('');
        setFotoPerfil('');
    };

    const registro = async (e) => {
        e.preventDefault();

        if ([nombre, apellidoPaterno, apellidoMaterno, correo, password, passwordConfirm, numCelular].includes('') || !fotoPerfil) {
            setError(true);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Debe llenar todos los campos",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        } else if (password !== passwordConfirm) {
            setPassword('');
            setPasswordConfirm('');
            Swal.fire({
                position: 'center',
                icon: 'warning',
                title: "Las contraseñas no coinciden",
                showConfirmButton: false,
                timer: 1500
            });
            setError(true);
            return;
        } else setError(false);

        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('apellidoPaterno', apellidoPaterno);
            formData.append('apellidoMaterno', apellidoMaterno);
            formData.append('correo', correo);
            formData.append('password', password);
            formData.append('numCelular', numCelular);
            formData.append('fotoPerfil', fotoPerfil);

            const { data } = await axios.post(`http://localhost:3001/register/asesorInterno`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500
            });

        } catch (err) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 1500
            });
        }
        limpiarCampos();
    };

    return (
        <>
            <div className="mt-5 mb-5">
                <Titulo titulo="Registro de Asesor" />
            </div>
            <form onSubmit={registro} style={{ maxWidth: '500px', margin: 'auto' }}>
                <div className="card border mb-3">
                    <div className="card-body">
                        <h5 className="card-title text-center">Ingrese los datos</h5>
                        <div className="mb-3 text-center">
                            <img id="foto" width='150px' src="./../../public/vite.svg" alt="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Foto del Asesor</label>
                            <input type="file" className="form-control" onChange={prevFoto} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido Paterno</label>
                            <input type="text" className="form-control" onChange={(e) => setApellidoPaterno(e.target.value)} value={apellidoPaterno} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Apellido Materno</label>
                            <input type="text" className="form-control" onChange={(e) => setApellidoMaterno(e.target.value)} value={apellidoMaterno} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo Electrónico</label>
                            <input type="email" className="form-control" onChange={(e) => setCorreo(e.target.value)} value={correo} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirmar Contraseña</label>
                            <input type="password" className="form-control" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número Celular</label>
                            <input type="number" className="form-control" onChange={(e) => setNumCelular(e.target.value)} value={numCelular} />
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                            <button className="btn btn-success me-md-2" type="submit">Registrar Asesor</button>
                            <button onClick={limpiarCampos} className="btn btn-primary" type="button">Cancelar</button>
                        </div>
                        {error && <Error mensaje='Todos los campos son obligatorios' />}
                    </div>
                </div>
            </form>
        </>
    );
};

export default RegistrarAsesor;
