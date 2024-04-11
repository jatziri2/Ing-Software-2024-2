import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearPelicula.css";

function CrearPelicula({ peliculas, setPeliculas }) {
  const [nuevaPelicula, setNuevaPelicula] = useState({ nombre: "", genero: "", duracion: "", inventario: 1 });
  const [peliculaAgregada, setPeliculaAgregada] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setNuevaPelicula((prevPelicula) => ({ ...prevPelicula, [name]: type === "checkbox" ? checked : value }));
  };

  const agregarPelicula = () => {
    if (!nuevaPelicula.nombre || !nuevaPelicula.inventario) { alert("Por favor, complete los campos obligatorios."); return; }
    const idPelicula = peliculas.length > 0 ? peliculas[peliculas.length - 1].idPelicula + 1 : 1;
    const peliculaNueva = { idPelicula, ...nuevaPelicula };
    setPeliculas((prevPeliculas) => [...prevPeliculas, peliculaNueva]);
    setPeliculaAgregada(true);
  };

  const handleOkClick = () => { navigate("/pelicula"); };

  const handleSubmit = (event) => { event.preventDefault(); agregarPelicula(); };

  return (
    <div className="CrearPelicula">
      <h1>Agregar Película</h1>
      <div className="mensaje">
        {peliculaAgregada && (
          <div className="caja">
            <p>Película agregada</p>
            <div className="section">
              <ul className="botCCP"><button onClick={handleOkClick}>Regresar</button></ul>
            </div>
          </div>
        )}
      </div>
      {!peliculaAgregada && (
        <>
          <div className="Pedir-container">
            <div className="Pedir">
              <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value={nuevaPelicula.nombre} onChange={handleChange} /><br />
                <label htmlFor="genero">Género:</label>
                <input type="text" id="genero" name="genero" value={nuevaPelicula.genero} onChange={handleChange} /><br />
                <label htmlFor="duracion">Duración (mínimo 99 min.):</label>
                <input type="number" id="duracion" name="duracion" value={nuevaPelicula.duracion} min={99} step={1} onChange={handleChange} /><br />
                <label htmlFor="inventario">Inventario:</label>
                <input type="number" id="inventario" name="inventario" value={nuevaPelicula.inventario} min={1} step={1} onChange={handleChange} /><br />
                <div className="section">
                  <ul className="botCCP"><button type="submit">Agregar</button></ul>
                </div>
              </form>
              <div className="section">
                <ul className="botCCP">
                  <Link to={{ pathname: "/pelicula", state: { peliculas, setPeliculas } }}><button>Regresar</button></Link>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CrearPelicula;
