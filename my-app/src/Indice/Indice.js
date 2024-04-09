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
      <div className="header-banner">
        BIENVENIDOS A
      </div>
      <Confetti width={width} height={height} />
      {/* Banner inferior con botones */}
      <div className="footer-banner">
        <div className="footer-buttons">
          <Link
            to={{
              pathname: "/usuario",
              state: { usuarios, SetUsuarios, rentas },
            }}
          >
            <button>Usuarios</button>
          </Link>
          <Link
            to={{
              pathname: "/pelicula",
              state: { peliculas, setPeliculas, rentas },
            }}
          >
            <button>Películas</button>
          </Link>
          <Link
            to={{
              pathname: "/renta",
              state: { usuarios, peliculas, rentas, setRentas },
            }}
          >
            <button>Rentas</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Indice;

