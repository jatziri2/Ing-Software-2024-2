import "./EditarPelicula.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditarPelicula({ peliculas, setPeliculas }) {
  const [datosPelicula, setDatosPelicula] = useState({
    nombre: "", genero: "",duracion: "",inventario: 1,
  });

  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [peliculaOriginal, setPeliculaOriginal] = useState(null);
  const [peliculaEditada, setPeliculaEditada] = useState(false);
  const [datosFaltantes, setDatosFaltantes] = useState(false);
  const [cambiosRealizados, setCambiosRealizados] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (peliculaSeleccionada) {
      setPeliculaOriginal({ ...peliculaSeleccionada });
    }
  }, [peliculaSeleccionada]);

  const handlePeliculaSeleccionada = (event) => {
    const peliculaId = parseInt(event.target.value);
    const pelicula = peliculas.find((pelicula) => pelicula.idPelicula === peliculaId);
    setPeliculaSeleccionada(pelicula);
    setDatosPelicula({ ...pelicula });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDatosPelicula((prevDatosPelicula) => ({
      ...prevDatosPelicula,
      [name]: value,
    }));
    setCambiosRealizados(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!cambiosRealizados) {
      setDatosFaltantes(true);
      return;
    }
    const idPelicula = peliculaSeleccionada.idPelicula;
    const peliculaEditada = { idPelicula, ...datosPelicula };
    const nuevasPeliculas = peliculas.map((pelicula) =>
      pelicula.idPelicula === idPelicula ? peliculaEditada : pelicula
    );
    setPeliculas(nuevasPeliculas);
    setPeliculaEditada(true);
  };

  const handleOkClick = () => {
    navigate("/pelicula");
  };

  const handleOkClick3 = () => {
    setDatosFaltantes(false);
  };

  return (
    <div className="EditarPelicula">
      <h1>Editar Película</h1>
      {!peliculaSeleccionada && (
        <div className="mensaje">
          <div className="caja">
            <br />
            <label htmlFor="peliculaSelect">Selecciona una película para editar</label>
            <br />
            <div className="custom-select-container">
              <select
                className="custom-select"
                id="peliculaSelect"
                onChange={handlePeliculaSeleccionada}
              >
                <option value="">Seleccionar película</option>
                {peliculas.map((pelicula) => (
                  <option key={pelicula.idPelicula} value={pelicula.idPelicula}>
                    {pelicula.idPelicula} - {pelicula.nombre} - {pelicula.inventario} unidades
                  </option>
                ))}
              </select>
            </div>
            <div className="section">
              <ul className="botC">
                <Link
                  to={{
                    pathname: "/pelicula",
                    state: { peliculas, setPeliculas },
                  }}
                >
                  <button>Regresar</button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaEditada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Película editada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {datosFaltantes && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Por favor complete los campos de nombre e inventario</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick3}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {peliculaSeleccionada && !peliculaEditada && !datosFaltantes && (
        <div className="formulario">
          <form onSubmit={handleSubmit}>
            <div className="Pedir-container">
              <div className="Pedir">
                <br />
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={datosPelicula.nombre}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="genero">Género:</label>
                <input
                  type="text"
                  id="genero"
                  name="genero"
                  value={datosPelicula.genero}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="duracion">Duracion(minimo 99 min.):</label>
                <input
                  type="number"
                  id="duracion"
                  name="duracion"
                  value={datosPelicula.duracion}
                  min={99}
                  step={1}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="inventario">Inventario:</label>
                <input
                  type="number"
                  id="inventario"
                  name="inventario"
                  value={datosPelicula.inventario}
                  min={0}
                  step={1}
                  onChange={handleChange}
                />
                <br />
                <div className="section">
                  <ul className="botC">
                    <button type="submit" disabled={!cambiosRealizados}>Guardar Cambios</button>
                  </ul>
                </div>
                <div className="section">
                  <ul className="botC">
                    <Link
                      to={{
                        pathname: "/pelicula",
                        state: { peliculas, setPeliculas },
                      }}
                    >
                      <button>Regresar</button>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditarPelicula;
