import "./Usuario.css";
import React from "react";
import { Link } from "react-router-dom";

function Usuario({ usuarios, setUsuarios, rentas }) {
  return (
    <div className="Usuario">
      {/* Banner superior */}
      <div className="banner">
        <h1></h1>
      </div>
      {/* Contenido principal */}
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/ver",
              state: { usuarios, setUsuarios },
            }}
          >
            <button className="verBtn">Ver Usuarios</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/agregar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button className="agregarBtn">Agregar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/editar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button className="editarBtn">Editar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/eliminar",
              state: { usuarios, setUsuarios, rentas },
            }}
          >
            <button className="eliminarBtn">Eliminar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/",
            }}
          >
            <button className="regresarBtn">Regresar</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Usuario;
