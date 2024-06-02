// Avance.jsx
import React, { useState } from 'react';
import './avance.css';

const Avance = () => {
  const [estado, setEstado] = useState(0);

  const estados = [
    {
      titulo: 'Inicio',
      descripcion: 'Este es el punto de partida. Aquí se proporciona una visión general del proceso.',
    },
    {
      titulo: 'Primera Tarea',
      descripcion: 'En este estado, deberás completar la primera tarea asignada.',
    },
    {
      titulo: 'Segunda Tarea',
      descripcion: 'Aquí trabajas en la segunda tarea. Sigue las instrucciones proporcionadas.',
    },
    {
      titulo: 'Revisión',
      descripcion: 'En este estado, se revisan las tareas completadas antes de continuar.',
    },
    {
      titulo: 'Finalización',
      descripcion: 'Felicidades, has completado todas las tareas. Este es el estado final.',
    },
  ];

  const avanzarEstado = () => {
    if (estado < estados.length - 1) {
      setEstado(estado + 1);
    }
  };

  return (
    <div className="card-avance">
      <h2 className='h2-avance'>Barra de Avance</h2>
      <div className="progress-container-avance">
        <div className="progress-bar" style={{ width: `${(estado + 1) * 20}%` }}></div>
      </div>
      <div className="estado">
        <h3>{estados[estado].titulo}</h3>
        <p>{estados[estado].descripcion}</p>
      </div>
      <button onClick={avanzarEstado} disabled={estado >= estados.length - 1} className='button-avance'>Ir al siguiente paso</button>
    </div>
  );
};

export default Avance;
