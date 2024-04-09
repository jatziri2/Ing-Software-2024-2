import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EliminarPelicula.css";

function EliminarPelicula({ peliculas, setPeliculas, rentas }) {
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [peliculaEliminada, setPeliculaEliminada] = useState(false);
  const [peliculaConRenta, setPeliculaConRenta] = useState(false);
  const navigate = useNavigate();

  const handlePeliculaSeleccionada = (event) => {
    const peliculaId = event.target.value;
    const pelicula = peliculas.find(
      (pelicula) => pelicula.idPelicula === parseInt(peliculaId)
    );
    setPeliculaSeleccionada(pelicula);
    // Verificar si la película tiene rentas asociadas
    const tieneRentas = verificarPeliculaConRenta(pelicula);
    setPeliculaConRenta(tieneRentas);
  };

  const verificarPeliculaConRenta = (pelicula) => {
    return rentas.some(
      (renta) => renta.idPelicula === pelicula.idPelicula
    );
  };

  const eliminarPelicula = () => {
    const nuevasPeliculas = peliculas.filter(
      (pelicula) => pelicula.idPelicula !== peliculaSeleccionada.idPelicula
    );
    setPeliculas(nuevasPeliculas);
    setPeliculaEliminada(true);
  };

  const handleCancelarClick = () => {
    setPeliculaSeleccionada(null);
    setPeliculaEliminada(false);
    setPeliculaConRenta(false);
  };

  const handleOkClick = () => {
    navigate("/pelicula");
  };

  return (
    <div className="EliminarPelicula">
      <h1>Eliminar Pelicula</h1>
      {!peliculaSeleccionada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <br />
            <label htmlFor="peliculaSelect">
              Seleccione una pelicula para eliminar
            </label>
            <br />
            <div className="custom-select-container">
              <select
                className="custom-select"
                id="peliculaSelect"
                onChange={handlePeliculaSeleccionada}
              >
                <option value="">Seleccionar pelicula</option>
                {peliculas.map((pelicula) => (
                  <option key={pelicula.idPelicula} value={pelicula.idPelicula}>
                    {pelicula.idPelicula} - {pelicula.nombre} -{" "}
                    {pelicula.inventario} unidades
                  </option>
                ))}
              </select>
              <div className="section">
                <ul className="botC">
                  <Link
                    to={{
                      pathname: "/pelicula",
                      state: { peliculas, setPeliculas, rentas },
                    }}
                  >
                    <button>Regresar</button>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {peliculaSeleccionada && !peliculaEliminada && peliculaConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p className="mensaje-rojo">
              La pelicula tiene rentas asociadas, no se puede eliminar
            </p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaSeleccionada && !peliculaEliminada && !peliculaConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>¿Eliminar la pelicula?</p>
            <p> {peliculaSeleccionada.nombre}</p>
            <div className="section">
              <ul className="botC">
                <button onClick={eliminarPelicula}>Eliminar</button>
              </ul>
              <ul className="botC">
                <button onClick={handleCancelarClick}>Cancelar</button>
                <Link
                  to={{
                    pathname: "/pelicula",
                    state: { peliculas, setPeliculas, rentas },
                  }}
                >
                  <button>Regresar</button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaEliminada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Pelicula eliminada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarPelicula;
