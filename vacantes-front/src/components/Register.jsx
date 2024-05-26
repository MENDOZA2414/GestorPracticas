import React, { useState } from "react";
import Titulo from "./common/Titulo";
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from './common/Error';
import md5 from 'md5';
import { Navigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';

const Register = () => {
    const [fotoPerfil, setFotoPerfil] = useState();
    const [nombreEntidad, setNombreEntidad] = useState('');
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [direccion, setDireccion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [contraseñaConfirm, setContraseñaConfirm] = useState('');
    const [numCelular, setNumCelular] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [goLogin, setGoLogin] = useState(false);

    const prevLogo = async (e) => {
        e.preventDefault();

        // Compresión de imagen
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
                document.getElementById('logo').src = lector.result;
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
        setNombreEntidad('');
        setNombreUsuario('');
        setDireccion('');
        setCategoria('');
        setCorreo('');
        setContraseña('');
        setContraseñaConfirm('');
        setNumCelular('');
        setFotoPerfil('');
    };

    const registro = async (e) => {
        e.preventDefault();

        if ([fotoPerfil, nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, contraseñaConfirm, numCelular].includes('') || [fotoPerfil, nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseñaConfirm, numCelular].includes('#')) {
            setError(true);
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Debe llenar todos los campos",
                showConfirmButton: false,
                timer: 1500
            });
            return;
        } else if (contraseña !== contraseñaConfirm) {
            setContraseña('');
            setContraseñaConfirm('');
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

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('fotoPerfil', fotoPerfil);
            formData.append('nombreEntidad', nombreEntidad);
            formData.append('nombreUsuario', nombreUsuario);
            formData.append('direccion', direccion);
            formData.append('categoria', categoria);
            formData.append('correo', correo);
            formData.append('contraseña', contraseña);
            formData.append('numCelular', numCelular);

            const { data } = await axios.post(`http://localhost:3001/register/entidadReceptora`, formData, {
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

            const dataCom = { id: data.data.insertId, logo: URL.createObjectURL(fotoPerfil), company: nombreEntidad, username: nombreUsuario, email: correo };
            const idSession = md5(dataCom.id + dataCom.email + dataCom.username);
            localStorage.setItem('user', JSON.stringify(dataCom));
            localStorage.setItem('idSession', idSession);
            setGoLogin(true);
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
        setLoading(false);
    };

    if (goLogin) {
        return <Navigate to="/misOfertas" />;
    }

    return (
        <>
        <div className="mt-5 mb-5">
            <Titulo titulo="Registro de empresas" />
            </div>
            <form onSubmit={registro} style={{ maxWidth: '500px', margin: 'auto' }}>
                <div className="card border mb-3">
                    <div className="card-body">
                        <h5 className="card-title text-center">Ingrese los datos</h5>
                        <div className="mb-3 text-center">
                            <img id="logo" width='150px' src="./../../public/vite.svg" alt="" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Foto de perfil</label>
                            <input type="file" className="form-control" onChange={prevLogo} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre de la empresa</label>
                            <input type="text" className="form-control" onChange={(e) => setNombreEntidad(e.target.value)} value={nombreEntidad} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nombre del usuario</label>
                            <input type="text" className="form-control" onChange={(e) => setNombreUsuario(e.target.value)} value={nombreUsuario} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Dirección</label>
                            <input type="text" className="form-control" onChange={(e) => setDireccion(e.target.value)} value={direccion} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <input type="text" className="form-control" onChange={(e) => setCategoria(e.target.value)} value={categoria} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Correo</label>
                            <input type="email" className="form-control" onChange={(e) => setCorreo(e.target.value)} value={correo} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña</label>
                            <input type="password" className="form-control" onChange={(e) => setContraseña(e.target.value)} value={contraseña} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirmar Contraseña</label>
                            <input type="password" className="form-control" onChange={(e) => setContraseñaConfirm(e.target.value)} value={contraseñaConfirm} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Número Celular</label>
                            <input type="text" className="form-control" onChange={(e) => setNumCelular(e.target.value)} value={numCelular} />
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                            <button className="btn btn-success me-md-2" type="submit">Crear cuenta empresa</button>
                            <button onClick={limpiarCampos} className="btn btn-primary" type="button">Cancelar</button>
                        </div>
                        {error && <Error mensaje='Todos los campos son obligatorios' />}
                    </div>
                </div>
            </form>
        </>
    );
};

export default Register;
