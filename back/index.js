const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');
const md5 = require('md5');
const app = express();

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'Jm241410',
    database: 'sistemaPracticas',
    connectTimeout: 100000,
    acquireTimeout: 100000,
};

let connection;

function handleDisconnect() {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            setTimeout(handleDisconnect, 2000); // Reintentar después de 2 segundos
        }
    });

    connection.on('error', (err) => {
        console.error('MySQL error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            handleDisconnect(); // Reconectar
        } else {
            throw err;
        }
    });
}

handleDisconnect();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 100 * 1024 * 1024, // 100 MB
        fields: 20, // Número máximo de campos no archivo permitidos
        fieldSize: 100 * 1024 * 1024, // 100 MB tamaño de un solo campo
    },
});

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});


app.get('/alumno/:numControl', (req, res) => {
    const numControl = req.params.numControl;
    connection.query(`SELECT * FROM alumno WHERE numControl = ?`, [numControl],
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

    connection.query(`INSERT INTO vacantePractica (titulo, fechaInicio, fechaFinal, ciudad, tipoTrabajo, descripcion, entidadID, asesorExternoID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [titulo, fechaInicio, fechaFinal, ciudad, tipoTrabajo, descripcion, entidadID, asesorExternoID],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    message: err.message
                });
            } else {
                connection.query(`SELECT * FROM vacantePractica WHERE vacantePracticaID = ?`, [result.insertId], (err2, result2) => {
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
    connection.query(`SELECT * FROM vacantePractica WHERE vacantePracticaID = ?`, [vacantePracticaID],
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

    const query = `
        SELECT vp.*, ae.nombre AS nombreAsesorExterno, er.nombreEntidad AS nombreEmpresa, er.fotoPerfil AS logoEmpresa 
        FROM vacantePractica vp
        JOIN asesorExterno ae ON vp.asesorExternoID = ae.asesorExternoID
        JOIN entidadReceptora er ON vp.entidadID = er.entidadID
        WHERE vp.entidadID = ? 
        ORDER BY vp.vacantePracticaID DESC 
        LIMIT ?, ?
    `;

    connection.query(query, [entidadID, start, parseInt(limit)], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            result.forEach(row => {
                if (row.logoEmpresa) {
                    row.logoEmpresa = `data:image/jpeg;base64,${Buffer.from(row.logoEmpresa).toString('base64')}`;
                }
            });
            res.status(200).send(result);
        }
    });
});

app.get('/vacantePractica/all/:page/:limit', (req, res) => {
    const page = req.params.page;
    const limit = req.params.limit;
    const start = (page - 1) * limit;

    const query = `
        SELECT vp.*, ae.nombre AS nombreAsesorExterno, er.nombreEntidad AS nombreEmpresa, er.fotoPerfil AS logoEmpresa 
        FROM vacantePractica vp
        JOIN asesorExterno ae ON vp.asesorExternoID = ae.asesorExternoID
        JOIN entidadReceptora er ON vp.entidadID = er.entidadID
        ORDER BY vp.vacantePracticaID DESC 
        LIMIT ?, ?
    `;

    connection.query(query, [start, parseInt(limit)], (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        } else {
            result.forEach(row => {
                if (row.logoEmpresa) {
                    row.logoEmpresa = `data:image/jpeg;base64,${Buffer.from(row.logoEmpresa).toString('base64')}`;
                }
            });
            res.status(200).send(result);
        }
    });
});

app.post('/aplicarVacante', (req, res) => {
    const { vacanteID, alumnoID, cartaPresentacion } = req.body;

    connection.query(`INSERT INTO aplicarVacante (vacanteID, alumnoID, cartaPresentacion) VALUES (?, ?, ?)`,
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
    connection.query(`SELECT A.*, V.titulo, AL.nombre, AL.apellidoPaterno, AL.apellidoMaterno, AL.correo 
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

// Ruta para registrar una postulación
app.post('/registerPostulacion', upload.single('cartaPresentacion'), (req, res) => {
    const { alumnoID, vacanteID } = req.body;
    const cartaPresentacion = req.file ? req.file.buffer : null;

    if (!alumnoID || !vacanteID || !cartaPresentacion) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }

    connection.query(`SELECT nombre, correo FROM alumno WHERE numControl = ?`, [alumnoID], (err, result) => {
        if (err) {
            return res.status(400).send({
                status: 400,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).send({
                status: 404,
                message: 'Alumno no encontrado'
            });
        }

        const { nombre, correo } = result[0];

        connection.query(`INSERT INTO postulacionAlumno (alumnoID, vacanteID, nombreAlumno, correoAlumno, cartaPresentacion) VALUES (?, ?, ?, ?, ?)`,
            [alumnoID, vacanteID, nombre, correo, cartaPresentacion],
            (err, result) => {
                if (err) {
                    return res.status(400).send({
                        status: 400,
                        message: err.message
                    });
                } else {
                    return res.status(201).send({
                        status: 201,
                        message: 'Postulación registrada con éxito',
                        data: { insertId: result.insertId }
                    });
                }
            }
        );
    });
});




app.post('/asesorInterno', upload.single('fotoPerfil'), (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    connection.query(`INSERT INTO asesorInterno (nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, md5(?), ?, ?)`,
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

// Ruta para obtener un asesor interno por ID
app.get('/asesorInterno/:id', (req, res) => {
    const asesorInternoID = req.params.id;
    connection.query(`SELECT * FROM asesorInterno WHERE asesorInternoID = ?`, [asesorInternoID],
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
    const { nombreEntidad, nombreUsuario, direccion, categoria, correo, password, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    if (!nombreEntidad || !nombreUsuario || !direccion || !categoria || !correo || !password || !numCelular) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }

    connection.query(`INSERT INTO entidadReceptora (nombreEntidad, nombreUsuario, direccion, categoria, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, ?, md5(?), ?, ?)`,
        [nombreEntidad, nombreUsuario, direccion, categoria, correo, password, numCelular, fotoPerfil],
        (err, result) => {
            if (err) {
                res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                res.status(201).send({
                    status: 201,
                    message: 'Entidad receptora registrada con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
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

    connection.query(`INSERT INTO alumno (numControl, nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, correo, contraseña, numCelular, fotoPerfil) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, md5(?), ?, ?)`,
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



// Ruta para registrar un asesor interno
app.post('/register/asesorInterno', upload.single('fotoPerfil'), (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, password, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !password || !numCelular) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }

    connection.query(`INSERT INTO asesorInterno (nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil) VALUES (?, ?, ?, ?, md5(?), ?, ?)`,
        [nombre, apellidoPaterno, apellidoMaterno, correo, password, numCelular, fotoPerfil],
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                return res.status(201).send({
                    status: 201,
                    message: 'Asesor interno registrado con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
});

// Ruta para registrar un asesor externo
app.post('/register/asesorExterno', upload.single('fotoPerfil'), (req, res) => {
    const { nombre, apellidoPaterno, apellidoMaterno, correo, password, numCelular, entidadID } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !password || !numCelular || !entidadID) {
        return res.status(400).send({
            status: 400,
            message: 'Todos los campos son obligatorios'
        });
    }

    connection.query(`INSERT INTO asesorExterno (nombre, apellidoPaterno, apellidoMaterno, correo, contraseña, numCelular, fotoPerfil, entidadID) VALUES (?, ?, ?, ?, md5(?), ?, ?, ?)`,
        [nombre, apellidoPaterno, apellidoMaterno, correo, password, numCelular, fotoPerfil, entidadID],
        (err, result) => {
            if (err) {
                return res.status(400).send({
                    status: 400,
                    message: err.message
                });
            } else {
                return res.status(201).send({
                    status: 201,
                    message: 'Asesor externo registrado con éxito',
                    data: { insertId: result.insertId }
                });
            }
        }
    );
});



app.post('/login/alumno', (req, res) => {
    const { email, password } = req.body;
    connection.query(`SELECT * FROM alumno WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
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
    connection.query(`SELECT * FROM entidadReceptora WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
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


// Ruta para el inicio de sesión de asesor interno
app.post('/login/asesorInterno', (req, res) => {
    const { email, password } = req.body;
    connection.query(`SELECT * FROM asesorInterno WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
      (err, result) => {
        if (err) {
          return res.status(500).send({ message: 'Error en el servidor' });
        }
        if (result.length > 0) {
          const asesor = result[0];
          if (asesor.fotoPerfil) {
            asesor.fotoPerfil = asesor.fotoPerfil.toString('base64');
          }
          res.status(200).send(asesor);
        } else {
          res.status(401).send({ status: 401, message: 'Correo o contraseña incorrectos' });
        }
      }
    );
  });
  

  // Ruta para el inicio de sesión de asesor externo
app.post('/login/asesorExterno', (req, res) => {
    const { email, password } = req.body;
    connection.query(`SELECT * FROM asesorExterno WHERE correo = ? AND contraseña = md5(?)`, [email, password], 
        (err, result) => {
            if (err) {
                return res.status(500).send({ message: 'Error en el servidor' });
            }
            if (result.length > 0) {
                const asesor = result[0];
                if (asesor.fotoPerfil) {
                    asesor.fotoPerfil = asesor.fotoPerfil.toString('base64');
                }
                res.status(200).send(asesor);
            } else {
                res.status(401).send({ status: 401, message: 'Correo o contraseña incorrectos' });
            }
        }
    );
});

app.put('/alumno/:numControl', upload.single('foto'), (req, res) => {
    const numControl = req.params.numControl;
    const { nombre, apellidoPaterno, apellidoMaterno, fechaNacimiento, carrera, semestre, turno, correo, numCelular } = req.body;
    const fotoPerfil = req.file ? req.file.buffer : null;

    let query = 'UPDATE alumno SET ';
    let fields = [];
    let values = [];

    if (nombre) fields.push('nombre = ?'), values.push(nombre);
    if (apellidoPaterno) fields.push('apellidoPaterno = ?'), values.push(apellidoPaterno);
    if (apellidoMaterno) fields.push('apellidoMaterno = ?'), values.push(apellidoMaterno);
    if (fechaNacimiento) fields.push('fechaNacimiento = ?'), values.push(fechaNacimiento);
    if (carrera) fields.push('carrera = ?'), values.push(carrera);
    if (semestre) fields.push('semestre = ?'), values.push(semestre);
    if (turno) fields.push('turno = ?'), values.push(turno);
    if (correo) fields.push('correo = ?'), values.push(correo);
    if (numCelular) fields.push('numCelular = ?'), values.push(numCelular);
    if (fotoPerfil) fields.push('fotoPerfil = ?'), values.push(fotoPerfil);

    if (fields.length === 0) {
        return res.status(400).send({ message: 'No fields to update' });
    }

    query += fields.join(', ') + ' WHERE numControl = ?';
    values.push(numControl);

    connection.query(query, values, (err, result) => {
        if (err) {
            console.error('Error updating data:', err);
            return res.status(500).send({ message: 'Error en el servidor' });
        }
        res.status(200).send({ message: 'Alumno actualizado con éxito' });
    });
});


app.post('/practicasProfesionales', (req, res) => {
    const { alumnoID, entidadID, asesorExternoID, asesorInternoID, fechaInicio, fechaFin, estado } = req.body;
    
    const query = `INSERT INTO practicasProfesionales (alumnoID, entidadID, asesorExternoID, asesorInternoID, fechaInicio, fechaFin, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    
    connection.query(query, [alumnoID, entidadID, asesorExternoID, asesorInternoID, fechaInicio, fechaFin, estado], (err, result) => {
        if (err) {
            return res.status(500).send({
                status: 500,
                message: err.message,
            });
        }
        return res.status(201).send({
            status: 201,
            message: 'Práctica profesional registrada con éxito',
            data: result.insertId,
        });
    });
});

app.get('/practicaProfesional/alumno/:numControl', (req, res) => {
    const numControl = req.params.numControl;
    const query = `
        SELECT * FROM practicasProfesionales 
        WHERE alumnoID = ? 
        ORDER BY fechaCreacion DESC LIMIT 1
    `;
    connection.query(query, [numControl], (err, result) => {
        if (err) {
            return res.status(500).send({ message: err.message });
        }
        if (result.length > 0) {
            res.status(200).send(result[0]);
        } else {
            res.status(404).send({ message: 'No se encontró una práctica profesional para este alumno' });
        }
    });
});


app.get('/asesorExterno/:id', (req, res) => {
    const asesorExternoID = req.params.id;
    connection.query(`SELECT * FROM asesorExterno WHERE asesorExternoID = ?`, [asesorExternoID],
        (err, result) => {
            if (result.length > 0) {
                const asesor = result[0];
                if (asesor.fotoPerfil) {
                    asesor.fotoPerfil = asesor.fotoPerfil.toString('base64');
                }
                res.status(200).send(asesor);
            } else {
                res.status(400).send({
                    message: 'No existe el asesor externo'
                });
            }
        }
    );
});

app.post('/uploadDocumentoAlumno', upload.single('file'), (req, res) => {
    const { alumnoID, nombreArchivo } = req.body;
    const archivo = req.file.buffer;

    const query = `INSERT INTO documentoAlumno (alumnoID, nombreArchivo, archivo) VALUES (?, ?, ?)`;
    connection.query(query, [alumnoID, nombreArchivo, archivo], (err, result) => {
        if (err) {
            console.error('Error al guardar el documento en la base de datos:', err);
            return res.status(500).send({
                status: 500,
                message: 'Error al guardar el documento en la base de datos: ' + err.message,
            });
        }
        return res.status(201).send({
            status: 201,
            message: 'Documento subido con éxito',
            documentoID: result.insertId,
        });
    });
});




// Ruta para obtener todos los documentos de un alumno
app.get('/documentosAlumno/:alumnoID', (req, res) => {
    const alumnoID = req.params.alumnoID;
    const query = 'SELECT documentoID AS id, nombreArchivo FROM documentoAlumno WHERE alumnoID = ?';

    connection.query(query, [alumnoID], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error en el servidor: ' + err.message });
        }
        res.status(200).send(result.length > 0 ? result : []); // Enviar un arreglo vacío si no hay documentos
    });
});



// Ruta para obtener un documento PDF
app.get('/documentoAlumno/:id', (req, res) => {
    const documentoID = req.params.id;
    const query = 'SELECT archivo, nombreArchivo FROM documentoAlumno WHERE documentoID = ?';

    connection.query(query, [documentoID], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error en el servidor: ' + err.message });
        }
        if (result.length > 0) {
            const documento = result[0];
            // Log del archivo recuperado
            console.log('Archivo recuperado:', documento.archivo);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${documento.nombreArchivo}"`);
            res.send(Buffer.from(documento.archivo, 'binary'));
        } else {
            res.status(404).send({ message: 'Documento no encontrado' });
        }
    });
});

app.delete('/documentoAlumno/:id', (req, res) => {
    const documentoID = req.params.id;
    const query = 'DELETE FROM documentoAlumno WHERE documentoID = ?';

    connection.query(query, [documentoID], (err, result) => {
        if (err) {
            return res.status(500).send({ message: 'Error en el servidor: ' + err.message });
        }
        if (result.affectedRows > 0) {
            res.status(200).send({ message: 'Documento eliminado con éxito' });
        } else {
            res.status(404).send({ message: 'Documento no encontrado' });
        }
    });
});




