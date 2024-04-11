import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearRenta.css";

function CrearRenta({ usuarios, peliculas, rentas, setRentas }) {
  const [renta, setRenta] = useState({ idUsuario: "", idPelicula: "", fecha_renta: "", dias_de_renta: 1, estatus: "" });
  const [rentaAgregada, setRentaAgregada] = useState(false);
  const navegar = useNavigate();

  const handleChange = (evento) => setRenta({ ...renta, [evento.target.name]: evento.target.type === "checkbox" ? evento.target.checked : evento.target.value });
  const agregarRenta = () => {
    renta.dias_de_renta < 1 && (renta.dias_de_renta = 1);
    const idRentar = rentas.length + 1;
    setRentas([...rentas, { idRentar, ...renta }]);
    setRentaAgregada(true);
  };
  const manejarOkClick = () => navegar("/renta");
  const manejarUsuarioSeleccionado = (evento) => setRenta({ ...renta, idUsuario: evento.target.value });
  const manejarPeliculaSeleccionada = (evento) => setRenta({ ...renta, idPelicula: evento.target.value });
  const manejarEnvio = (evento) => { evento.preventDefault(); agregarRenta(); };

  return (
    <div className="CrearRenta">
      <h1>Agregar Renta</h1>
      <div className="mensaje">
        {rentaAgregada && (
          <div className="Pedir">
            <p>Renta agregada</p>
            <div className="section">
              <ul className="botC">
                <button onClick={manejarOkClick}>Regresar</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!rentaAgregada && (
        <div className="Pedir-container">
          <div className="Pedir">
            <br />
            <form onSubmit={manejarEnvio}>
              <label htmlFor="idUsuario">Selecciona el Usuario:</label>
              <select name="idUsuario" value={renta.idUsuario} onChange={manejarUsuarioSeleccionado} required>
                <option value=""></option>
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>{usuario.idUsuario} - {usuario.nombre} - {usuario.email}</option>
                ))}
              </select>
              <br />
              <label htmlFor="idPelicula">Selecciona la Película:</label>
              <select name="idPelicula" value={renta.idPelicula} onChange={manejarPeliculaSeleccionada} required>
                <option value=""></option>
                {peliculas.map((pelicula) => (
                  <option key={pelicula.idPelicula} value={pelicula.idPelicula}>{pelicula.idPelicula} - {pelicula.nombre} - {pelicula.inventario} unidades</option>
                ))}
              </select>
              <br />
              <label htmlFor="fecha_renta">Fecha de Renta:</label>
              <input type="date" name="fecha_renta" value={renta.fecha_renta} onChange={handleChange} required />
              <br />
              <label htmlFor="dias_de_renta">Días de Renta:</label>
              <input type="number" name="dias_de_renta" value={renta.dias_de_renta} min={1} step={1} onChange={handleChange} />
              <br />
              <label htmlFor="estatus">Estado:</label>
              <select name="estatus" value={renta.estatus} onChange={handleChange} required>
                <option value="">Seleccionar estado</option>
                <option value="Entregada">Entregada</option>
                <option value="Sin Entregar">Sin Entregar</option>
              </select>
              <br />
              <div className="section">
                <ul className="botCCR">
                  <button>Agregar</button>
                </ul>
              </div>
            </form>
            <div className="section">
              <ul className="botCCR">
                <Link to={{ pathname: "/renta", state: { usuarios, peliculas, rentas, setRentas } }}>
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
