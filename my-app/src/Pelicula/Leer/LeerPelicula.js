import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LeerPelicula.css";

function Table({ peliculas }) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre de Pelicula</th>
            <th>Genero</th>
            <th>Duracion</th>
            <th>Inventario</th>
          </tr>
        </thead>
        <tbody>
          {peliculas.map((peliculas) => (
            <tr key={peliculas.idPelicula}>
              <td>{peliculas.idPelicula}</td>
              <td>{peliculas.nombre}</td>
              <td>{peliculas.genero}</td>
              <td>{peliculas.duracion}</td>
              <td>{peliculas.inventario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeerPeliculas({ peliculas }) {
  const navigate = useNavigate();

  const handleRegresar = () => {
    navigate("/pelicula");
  };

  return (
    <div className="Leerpeliculas">
      <h1>Peliculas registrados</h1>
      <Table peliculas={peliculas} />
      <div className="section">
        <ul className="botC">
          <button onClick={handleRegresar} className="regresarBtn">
            Regresar
          </button>
        </ul>
      </div>
    </div>
  );
}

export default LeerPeliculas;
