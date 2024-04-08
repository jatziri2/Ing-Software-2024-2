import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LeerUsuario.css";

function Table({ usuarios }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Contraseña</th>
            <th>Email</th>
            <th>Super Usuario</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.idUsuario}>
              <td>{usuario.idUsuario}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apPat}</td>
              <td>{usuario.apMat}</td>
              <td>{usuario.password}</td>
              <td>{usuario.email}</td>
              <td>{usuario.superUser ? "Si" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeerUsuario({ usuarios }) {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate("/usuario");
  };

  return (
    <div className="LeerUsuario">
      <h1>Usuarios registrados</h1>
      <Table usuarios={usuarios} />
      <div className="section">
        <ul className="botC">
          <button onClick={handleRegresar} className="regresarBtn">
            Regresar
          </button>
        </ul>
      </div>
    </div>
  );
}

export default LeerUsuario;
