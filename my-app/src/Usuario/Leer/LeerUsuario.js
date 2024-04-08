import "./LeerUsuario.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate

function LeerUsuario({ usuarios, setUsuarios, rentas }) {
  const navigate = useNavigate(); // Usa useNavigate

  const handleRegresar = () => {
    navigate("/usuario"); // Redirige a la ruta adecuada
  };

  return (
    <div className="LeerUsuario">
      <h1>Usuarios registrados</h1>
      <div className="tablecontainer">
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
      
      {/* Botón de Regresar */}
      <div className="section">
        <ul className="botC">
          <button onClick={handleRegresar}>Regresar</button> {/* Usa la función handleRegresar */}
        </ul>
      </div>
    </div>
  );
}

export default LeerUsuario;
