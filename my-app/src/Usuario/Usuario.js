import "./Usuario.css";

import React from "react";
import { Link } from "react-router-dom";

function Usuario({ usuarios, setUsuarios, rentas }) {
  return (
    <div className="Usuario">
      <h1>Opciones de usuarios</h1>
      <div className="section">
      <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/ver",
              state: { usuarios, setUsuarios },
            }}
          >
            <button>Ver Usuarios</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/agregar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button>Agregar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/editar",
              state: { usuarios, setUsuarios },
            }}
          >
            <button>Modificar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/usuario/eliminar",
              state: { usuarios, setUsuarios, rentas },
            }}
          >
            <button>Eliminar Usuario</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/",
            }}
          >
            <button>Regresar</button>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Usuario;