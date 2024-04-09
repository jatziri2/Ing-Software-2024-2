import "./Pelicula.css";
import React from "react";
import { Link } from "react-router-dom";

function Pelicula({ peliculas, setPeliculas, rentas }) {
  return (
    <div className="Pelicula">
      {/* Banner superior */}
      <div className="bannerPeli">
        <h1></h1>
      </div>
      {/* Contenido principal */}
      <div className="section">
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/ver",
              state: { peliculas, setPeliculas },
            }}
          >
            <button className="verBtn">Ver peliculas</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/agregar",
              state: { peliculas, setPeliculas },
            }}
          >
            <button className="agregarBtn">Agregar peliculas</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/editar",
              state: { peliculas, setPeliculas },
            }}
          >
            <button className="editarBtn">Editar pelicula</button>
          </Link>
        </ul>
        <ul className="botC">
          <Link
            to={{
              pathname: "/pelicula/eliminar",
              state: { peliculas, setPeliculas, rentas },
            }}
          >
            <button className="eliminarBtn">Eliminar pelicula</button>
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

export default Pelicula;
