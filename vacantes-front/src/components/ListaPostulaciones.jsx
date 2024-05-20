import React from "react";

const ListaPostulaciones = ({ postulaciones }) => {
  return (
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Cargo</th>
          <th scope="col">Foto</th>
          <th scope="col">Postulados</th>
          <th scope="col">DNI</th>
          <th scope="col">EMAIL</th>
        </tr>
      </thead>
      <tbody>
        {postulaciones.map((item,index) => {
          return (
            <tr key={item.job_id+index}>
              <td><img src={item.img} width={50} height={50} /></td>
              <td>{item.title}</td>
              <td>{item.name}</td>
              <td>{item.dni}</td>
              <td>{item.email}</td>
              
            </tr>
          );
        })}

      </tbody>
    </table>
  );
};

export default ListaPostulaciones;
