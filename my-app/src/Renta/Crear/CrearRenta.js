import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearRenta.css";

function CrearRenta({ usuarios, peliculas, rentas, setRentas }) {
  const [renta, setRenta] = useState({idUsuario: "",idPelicula: "",fecha_renta: "",dias_de_renta: 1,estatus: "", 
  });

  const [rentaAgregada, setRentaAgregada] = useState(false);
  const navigate = useNavigate();

  // Manejador de cambio genérico
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setRenta({ ...renta, [name]: type === "checkbox" ? checked : value });
  };

  // Manejador para agregar renta
  const agregarRenta = () => {
    if (renta.dias_de_renta < 1) {
      // Validación de entrada de usuario
      renta.dias_de_renta = 1;
    }
    const idRentar = rentas.length + 1; // Nuevo ID de renta
    const nuevaRenta = { idRentar, ...renta };
    setRentas([...rentas, nuevaRenta]); // Agregar nueva renta al estado
    setRentaAgregada(true);
  };

  // Manejador para el botón OK después de agregar renta
  const handleOkClick = () => {
    navigate("/renta");
  };

  // Manejadores para la selección de usuario y película
  const handleUsuarioSeleccionado = (event) => {
    setRenta({ ...renta, idUsuario: event.target.value });
  };

  const handlePeliculaSeleccionada = (event) => {
    setRenta({ ...renta, idPelicula: event.target.value });
  };

  // Manejador para enviar el formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    agregarRenta();
  };

  return (
    <div className="CrearRenta">
      <h1>Agregar Renta</h1>
      {/* Mensaje de renta agregada */}
      <div className="mensaje">
        {rentaAgregada && (
          <div className="caja">
            <p>Renta agregada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>OK</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Formulario para agregar renta */}
      {!rentaAgregada && (
        <div className="Pedir-container">
          <div className="Pedir">
            <br></br>
            <form onSubmit={handleSubmit}>
              {/* Selección de usuario */}
              <label htmlFor="idUsuario">Selecciona el Usuario:</label>
              <select
                name="idUsuario"
                value={renta.idUsuario}
                onChange={handleUsuarioSeleccionado}
                required
              >
                <option value=""></option>
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                    {usuario.idUsuario} - {usuario.nombre} - {usuario.email}
                  </option>
                ))}
              </select>
              <br></br>
              {/* Selección de película */}
              <label htmlFor="idPelicula">Selecciona la Película:</label>
              <select
                name="idPelicula"
                value={renta.idPelicula}
                onChange={handlePeliculaSeleccionada}
                required
              >
                <option value=""></option>
                {peliculas.map((pelicula) => (
                  <option
                    key={pelicula.idPelicula}
                    value={pelicula.idPelicula}
                  >
                    {pelicula.idPelicula} - {pelicula.nombre} -{" "}
                    {pelicula.inventario} unidades
                  </option>
                ))}
              </select>
              <br></br>
              {/* Fecha de renta */}
              <label htmlFor="fecha_renta">Fecha de Renta:</label>
              <input
                type="date"
                name="fecha_renta"
                value={renta.fecha_renta}
                onChange={handleChange}
                required
              />
              <br></br>
              {/* Días de renta */}
              <label htmlFor="dias_de_renta">Días de Renta:</label>
              <input
                type="number"
                name="dias_de_renta"
                value={renta.dias_de_renta}
                min={1}
                step={1}
                onChange={handleChange}
              />
              <br></br>
              {/* Estado de la renta */}
              <label htmlFor="estatus">Estado:</label>
              <select
                name="estatus"
                value={renta.estatus}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar estado</option>
                <option value="Entregada">Entregada</option>
                <option value="Sin Entregar">Sin Entregar</option>
              </select>
              <br></br>
              {/* Botón de agregar */}
              <div className="section">
                <ul className="botCCR">
                  <button>Agregar</button>
                </ul>
              </div>
            </form>
            {/* Botón de regresar */}
            <div className="section">
              <ul className="botCCR">
                <Link
                  to={{
                    pathname: "/renta",
                    state: { usuarios, peliculas, rentas, setRentas },
                  }}
                >
                  <button>Regresar</button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CrearRenta;
