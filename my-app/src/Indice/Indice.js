import React from "react";
import { Link } from "react-router-dom";
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import "./Indice.css";

function Indice({
  usuarios,
  SetUsuarios,
  peliculas,
  setPeliculas,
  rentas,
  setRentas,
}) {
  const { width, height } = useWindowSize();

  return (
    <div className="Indice">
      <h2>BIENVENIDOS A "CLONEBUSTER"</h2>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/usuario",
              state: { usuarios, SetUsuarios, rentas },
            }}
          >
            <button>Usuarios</button>
          </Link>
        </ul>
      </div>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/pelicula",
              state: { peliculas, setPeliculas, rentas },
            }}
          >
            <button>Peliculas</button>
          </Link>
        </ul>
      </div>
      <div className="section">
        <ul className="section-item">
          <Link
            to={{
              pathname: "/renta",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button>Rentas</button>
          </Link>
        </ul>
      </div>
      <Confetti width={width} height={height} />
    </div>
  );
}

export default Indice;
