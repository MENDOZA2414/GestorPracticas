const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const md5 = require('md5'); // Agregar esta línea

const app = express();

const database = "sistemaPracticas";  // Actualiza el nombre de la base de datos
const user = "root";
const host = "localhost";
const password = "Jm241410";

const db = mysql.createConnection({
    host,
    user,
    password,
    database,
});

const PORT = process.env.PORT || 3001;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

app.post('/entidadReceptora', upload.single('logo'), (req, res) => {
    const nombreEntidad = req.body.nombreEntidad;
    const nombreUsuario = req.body.nombreUsuario;
    const direccion = req.body.direccion;
    const categoria = req.body.categoria;
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    const numCelular = req.body.numCelular;
    const fotoPerfil = req.file ? req.file.buffer : null;

    db.query(`INSERT INTO entidadReceptora (nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, ?, md5(?), ?, ?)`, 
        [nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, numCelular, fotoPerfil],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Entidad receptora creada con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
});

app.get('/entidadReceptora/:id', (req, res) => {
    const entidadID = req.params.id;
    db.query(`SELECT * FROM entidadReceptora WHERE entidadID = ?`, [entidadID],
        (err, result) => {
            if (result.length > 0) {
                const entidad = result[0];
                if (entidad.fotoPerfil) {
                    entidad.fotoPerfil = entidad.fotoPerfil.toString('base64');
                }
                res.status(200).send(entidad);
            } else {
                res.status(400).send({
                    message: 'No existe la entidad receptora'
                });
            }
        }
    );
});

app.post('/alumno', upload.single('foto'), (req, res) => {
    const numControl = req.body.numControl;
    const nombre = req.body.nombre;
    const apellidoPaterno = req.body.apellidoPaterno;
    const apellidoMaterno = req.body.apellidoMaterno;
    const fechaNacimiento = req.body.fechaNacimiento;
    const carrera = req.body.carrera;
    const semestre = req.body.semestre;
    const turno = req.body.turno;
    const correo = req.body.correo;
    const contraseña = req.body.contraseña;
    const numCelular = req.body.numCelular;
    const fotoPerfil = req.file ? req.file.buffer : null;
    const asesorInternoID = req.body.asesorInternoID;

    db.query(`INSERT INTO alumno (numControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, correo, contraseña, numCelular, fotoPerfil, asesorInternoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, md5(?), ?, ?, ?)`, 
        [numControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, correo, contraseña, numCelular, fotoPerfil, asesorInternoID],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Alumno registrado con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
});

app.get('/alumno/:numControl', (req, res) => {
    const numControl = req.params.numControl;
    db.query(`SELECT * FROM alumno WHERE numControl = ?`, [numControl],
        (err, result) => {
            if (result.length > 0) {
                const alumno = result[0];
                if (alumno.fotoPerfil) {
                    alumno.fotoPerfil = alumno.fotoPerfil.toString('base64');
                }
                res.status(200).send(alumno);
            } else {
                res.status(400).send({
                    message: 'No existe el alumno'
                });
            }
        }
    );
});

app.post('/vacantePractica', (req, res) => {
    const { titulo, fechaInicio, fechaFinal, ciudad, tipoTrabajo, descripcion, entidadID, asesorExternoID } = req.body;

    db.query(`INSERT INTO vacantePractica (titulo, fechaInicio, fechaFinal, ciudad, tipoTrabajo, descripcion, entidadID, asesorExternoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [titulo, fechaInicio, fechaFinal, ciudad, tipoTrabajo, descripcion, entidadID, asesorExternoID],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: err.message
                });
            } else {
                db.query(`SELECT * FROM vacantePractica WHERE vacantePracticaID = ?`, [result.insertId], (err2, result2) => {
                    if (err2) {
                        res.status(400).send({
                            message: err2.message
                        });
                    } else {
                        res.status(201).send({
                            status: 201,
                            message: 'Vacante creada con éxito',
                            data: result2[0]
                        });
                    }
                });
            }
        });
});

app.get('/vacantePractica/:id', (req, res) => {
    const vacantePracticaID = req.params.id;
    db.query(`SELECT * FROM vacantePractica WHERE vacantePracticaID = ?`, [vacantePracticaID],
        (err, result) => {
            if (result.length > 0) {
                res.status(200).send(result[0]);
            } else {
                res.status(400).send({
                    message: 'No existe la vacante'
                });
            }
        }
    );
});

app.get('/vacantePractica/all/:entidadID/:page/:limit', (req, res) => {
    const entidadID = req.params.entidadID;
    const page = req.params.page;
    const limit = req.params.limit;
    const start = (page - 1) * limit;

    db.query(`SELECT * FROM vacantePractica WHERE entidadID = ? and deleted = 0 ORDER BY vacantePracticaID DESC LIMIT ?, ?`, [entidadID, start, limit], 
        (err, result) => {
            if (err) {
                res.status(500).send({
                    message: err.message
                });
            } else {
                res.status(200).send(result);
            }
        });
});


app.post('/aplicarVacante', (req, res) => {
    const { vacanteID, alumnoID, cartaPresentacion } = req.body;

    db.query(`INSERT INTO aplicarVacante (vacanteID, alumnoID, cartaPresentacion) VALUES (?, ?, ?)`,
        [vacanteID, alumnoID, cartaPresentacion],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Postulación registrada con éxito',
                    data: result
                });
            }
        });
});

app.get('/aplicaciones/:vacanteID', (req, res) => {
    const vacanteID = req.params.vacanteID;
    db.query(`SELECT A.*, V.titulo, AL.nombre, AL.apellidoPaterno, AL.apellidoMaterno, AL.correo 
              FROM aplicarVacante A 
              INNER JOIN vacantePractica V ON A.vacanteID = V.vacantePracticaID 
              INNER JOIN alumno AL ON A.alumnoID = AL.numControl 
              WHERE A.vacanteID = ?`, [vacanteID], 
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error en el servidor' });
            }
            if (result.length > 0) {
                res.status(200).send(result);
            } else {
                res.status(400).send({ message: 'No hay postulaciones' });
            }
        });
});


app.post('/asesorInterno', upload.single('fotoPerfil'), (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    db.query(`INSERT INTO asesorInterno (nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, md5(?), ?, ?)`,
        [nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Asesor interno registrado con éxito',
                    data: { insertId: result.insertId }
                });
            }
        });
});

app.get('/asesorInterno/:id', (req, res) => {
    const asesorInternoID = req.params.id;
    db.query(`SELECT * FROM asesorInterno WHERE asesorInternoID = ?`, [asesorInternoID],
        (err, result) => {
            if (result.length > 0) {
                const asesor = result[0];
                if (asesor.fotoPerfil) {
                    asesor.fotoPerfil = asesor.fotoPerfil.toString('base64');
                }
                res.status(200).send(asesor);
            } else {
                res.status(400).send({
                    message: 'No existe el asesor interno'
                });
            }
        }
    );
});


// Ruta para registrar una entidad receptora
app.post('/register/entidadReceptora', upload.single('fotoPerfil'), (req, res) => {
    const { nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;
    if (!nombreEntidad || !nombreUsuario || !direccion || !categoria || !correo || !contraseña || !numCelular) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }
    db.query(`INSERT INTO entidadReceptora (nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [nombreEntidad, nombreUsuario, direccion, categoria, correo, md5(contraseña), numCelular, fotoPerfil],
    (err, result) => {
        if (err) {
            res.status(400).send({ status: 400, message: err.message });
        } else {
            res.status(201).send({ status: 201, message: 'Entidad receptora registrada con éxito', data: { insertId: result.insertId } });
        }
    });
});


// Registro de alumnos
app.post('/register/alumno', upload.single('foto'), (req, res) => {
    const { numeroControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, email, password, celular } = req.body;
    const foto = req.file ? req.file.buffer : null;

    if (!numeroControl || !nombre || !apellidoPaterno || !apellidoMaterno || !fechaNacimiento || !carrera || !semestre || !turno || !email || !password || !celular) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }

    db.query(`INSERT INTO alumno (numControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, correo, contraseña, numCelular, fotoPerfil) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, md5(?), ?, ?)`,
        [numeroControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, email, password, celular, foto],
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                return res.status(201).send({
                    status: 201,
                    message: 'Alumno registrado con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
});



// Ruta para registrar un asesor (interno o externo)
app.post('/register/asesor', upload.single('fotoPerfil'), (req, res) => {
    const { tipoAsesor, nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, entidadID } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;
    const tabla = tipoAsesor === 'interno' ? 'asesorInterno' : 'asesorExterno';
    db.query(`INSERT INTO ${tabla} (nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil, entidadID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [nombre, apellidoPaterno, apellidoMaterno, correo, md5(contraseña), numCelular, fotoPerfil, entidadID],
    (err, result) => {
        if (err) {
            res.status(400).send({ status: 400, message: err.message });
        } else {
            res.status(201).send({ status: 201, message: 'Asesor registrado con éxito', data: { insertId: result.insertId } });
        }
    });
});



app.post('/login/alumno', (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM alumno WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error en el servidor' });
            }
            if (result.length > 0) {
                const alumno = result[0];
                if (alumno.fotoPerfil) {
                    alumno.fotoPerfil = alumno.fotoPerfil.toString('base64');
                }
                res.status(200).send(alumno);
            } else {
                res.status(401).send({ status: 401, message: 'Correo o contraseña incorrectos' });
            }
        }
    );
});

app.post('/login/entidad', (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM entidadReceptora WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error en el servidor' });
            }
            if (result.length > 0) {
                const entidad = result[0];
                if (entidad.fotoPerfil) {
                    entidad.fotoPerfil = entidad.fotoPerfil.toString('base64');
                }
                res.status(200).send(entidad);
            } else {
                res.status(401).send({ status: 401, message: 'Correo o contraseña incorrectos' });
            }
        }
    );
});
