import "./Renta.css";
import React from "react";
import { Link } from "react-router-dom";

function Renta({ usuarios,peliculas, setRentas, rentas }) {
  return (
    <div className="Renta">
      {/* Banner superior */}
      <div className="bannerRenta">
        <h1></h1>
      </div>
      {/* Contenido principal */}
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/renta/ver",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button className="verBtn">Ver rentas</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/renta/agregar",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button className="agregarBtn">Agregar renta</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/renta/editar",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button className="editarBtn">Editar renta</button>
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

export default Renta;
