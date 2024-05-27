-- Desactivar las restricciones de clave foránea
SET FOREIGN_KEY_CHECKS = 0;

-- Comandos para eliminar cada tabla
DROP TABLE IF EXISTS reporte;
DROP TABLE IF EXISTS documento;
DROP TABLE IF EXISTS practicasProfesionales;
DROP TABLE IF EXISTS aplicarVacante;
DROP TABLE IF EXISTS vacantePractica;
DROP TABLE IF EXISTS postulacionAlumno;
DROP TABLE IF EXISTS asesorExterno;
DROP TABLE IF EXISTS entidadReceptora;
DROP TABLE IF EXISTS asesorInterno;
DROP TABLE IF EXISTS alumno;
DROP TABLE IF EXISTS administrador;

-- Reactivar las restricciones de clave foránea
SET FOREIGN_KEY_CHECKS = 1;

-- CREAR BASE DE DATOS
CREATE DATABASE sistemaPracticas;
USE sistemaPracticas;

-- Crear tabla para Administradores
CREATE TABLE IF NOT EXISTS administrador (
    adminID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidoPaterno VARCHAR(255) NOT NULL,
	apellidoMaterno VARCHAR(255),
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    numCelular VARCHAR(10) NOT NULL UNIQUE,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para Asesores Internos
CREATE TABLE asesorInterno (
    asesorInternoID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
	apellidoPaterno VARCHAR(255) NOT NULL,
	apellidoMaterno VARCHAR(255),
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    numCelular VARCHAR(10) NOT NULL UNIQUE,
    fotoPerfil LONGBLOB NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla para Alumnos
CREATE TABLE alumno (
    numControl VARCHAR(10) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidoPaterno VARCHAR(255) NOT NULL,
	apellidoMaterno VARCHAR(255),
    fechaNacimiento DATE NOT NULL,
    carrera ENUM('IDS', 'ITC', 'IC', 'LATI', 'LITI'),
    semestre ENUM('1', '2', '3', '4', '5', '6', '7', '8', '9'),
    turno ENUM('TM', 'TV'),
    correo VARCHAR(255) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    numCelular VARCHAR(10) NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    fotoPerfil LONGBLOB,
    asesorInternoID INT,
    CONSTRAINT fkAsesorInternoID FOREIGN KEY (asesorInternoID) REFERENCES asesorInterno(asesorInternoID)
);

-- Crear tabla para Entidades Receptoras
CREATE TABLE IF NOT EXISTS entidadReceptora (
    entidadID INT AUTO_INCREMENT PRIMARY KEY,
    nombreEntidad VARCHAR(255) NOT NULL,
    nombreUsuario VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    categoria VARCHAR(255) NOT NULL,
    correo VARCHAR(255) UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    numCelular VARCHAR(10) NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    fotoPerfil LONGBLOB
);

-- Crear tabla para Asesores Externos
CREATE TABLE asesorExterno (
    asesorExternoID INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellidoPaterno VARCHAR(255) NOT NULL,
	apellidoMaterno VARCHAR(255),
    correo VARCHAR(255) NOT NULL UNIQUE,
    numCelular VARCHAR(10) NOT NULL,
    fotoPerfil LONGBLOB NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    entidadID INT,
    CONSTRAINT fkEntidadID FOREIGN KEY (entidadID) REFERENCES entidadReceptora(entidadID)
);

-- Crear tabla para Vacantes de Prácticas
CREATE TABLE IF NOT EXISTS vacantePractica (
    vacantePracticaID INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFinal DATE NOT NULL,
    ciudad VARCHAR(45) NOT NULL,
    tipoTrabajo ENUM('Remoto', 'Presencial', 'Semi-presencial'),
    descripcion TEXT NOT NULL,
    entidadID INT NOT NULL,
    asesorExternoID INT NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkEntidadIDVacante FOREIGN KEY (entidadID) REFERENCES entidadReceptora(entidadID),
    CONSTRAINT fkAsesorExternoVacante FOREIGN KEY (asesorExternoID) REFERENCES asesorExterno(asesorExternoID)
);


CREATE TABLE IF NOT EXISTS aplicarVacante (
	aplicarVacanteID INT AUTO_INCREMENT PRIMARY KEY,
    vacanteID INT NOT NULL,
    alumnoID VARCHAR(10) NOT NULL,
    fechaAplicacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    KEY fkVacanteAlumnoIdx (alumnoID),
    KEY fkVacanteVacanteIdx (vacanteID),
    CONSTRAINT fkVacante FOREIGN KEY (vacanteID) REFERENCES vacantePractica (vacantePracticaID),
    CONSTRAINT fkAlumno FOREIGN KEY (alumnoID) REFERENCES alumno (numControl)
);

CREATE TABLE IF NOT EXISTS postulacionAlumno (
    postulacionID INT AUTO_INCREMENT PRIMARY KEY,
    alumnoID VARCHAR(10) NOT NULL,
    nombreAlumno VARCHAR(255) NOT NULL,
    correoAlumno VARCHAR(255) NOT NULL,
    cartaPresentacion LONGBLOB,
    CONSTRAINT fkAlumnoPostulacion FOREIGN KEY (alumnoID) REFERENCES alumno (numControl)
);

-- Crear tabla para Prácticas Profesionales
CREATE TABLE IF NOT EXISTS practicasProfesionales (
    practicaID INT AUTO_INCREMENT PRIMARY KEY,
    alumnoID VARCHAR(10) NOT NULL,
    entidadID INT NOT NULL,
    asesorExternoID INT NOT NULL,
    asesorInternoID INT NOT NULL,
    fechaInicio DATE NOT NULL,
    fechaFin DATE NOT NULL,
    estado VARCHAR(100) NOT NULL,
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkAlumnoPractica FOREIGN KEY (alumnoID) REFERENCES alumno(numControl),
    CONSTRAINT fkEntidadPractica FOREIGN KEY (entidadID) REFERENCES entidadReceptora(entidadID),
    CONSTRAINT fkAsesorExternoPractica FOREIGN KEY (asesorExternoID) REFERENCES asesorExterno(asesorExternoID),
    CONSTRAINT fkAsesorInternoPractica FOREIGN KEY (asesorInternoID) REFERENCES asesorInterno(asesorInternoID)
);

-- Crear tabla para Documentos
CREATE TABLE IF NOT EXISTS documento (
    documentoID INT AUTO_INCREMENT PRIMARY KEY,
    practicaID INT NOT NULL,
    tipoDocumento ENUM('Alumno', 'AsesorInterno', 'EntidadReceptora') NOT NULL,
    nombreArchivo VARCHAR(255) NOT NULL,
    rutaArchivo VARCHAR(255) NOT NULL,
    fechaSubida TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkPracticaDocumento FOREIGN KEY (practicaID) REFERENCES practicasProfesionales(practicaID)
);


-- Crear tabla para Reporte
CREATE TABLE IF NOT EXISTS reporte (
    reporteID INT AUTO_INCREMENT PRIMARY KEY,
    practicaID INT NOT NULL,
    tipo ENUM('analisis', 'alumno') NOT NULL, -- Campo para diferenciar el tipo de reporte
    fechaReporte DATE NOT NULL,
    descripcion TEXT NOT NULL,
    contenido BLOB, -- Opcional, para almacenar archivos en caso de reportes de alumno
    fechaCreacion TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fkPracticaReporte FOREIGN KEY (practicaID) REFERENCES practicasProfesionales(practicaID)
);

