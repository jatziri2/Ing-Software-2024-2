import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CrearUsuario.css";

function CrearUsuario({ usuarios, setUsuarios }) {
  const [usuario, setUsuario] = useState({
    nombre: "",apPat: "",apMat: "",password: "",email: "",superUser: false,
  });

  const [mensaje, setMensaje] = useState(""); // Estado para controlar los mensajes
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const agregarUsuario = () => {
    if (!usuario.nombre || !usuario.apPat || !usuario.email || !usuario.password) {
      setMensaje("Por favor complete todos los campos.");
    } else if (usuarios.some((u) => u.email === usuario.email)) {
      setMensaje("Correo en uso, intente con otro.");
    } else {
      const idUsuario = usuarios.length ? usuarios[usuarios.length - 1].idUsuario + 1 : 1;
      const nuevoUsuario = { idUsuario, ...usuario };
      setUsuarios([...usuarios, nuevoUsuario]);
      setMensaje("Usuario agregado correctamente.");
      setTimeout(() => {
        navigate("/usuario");
      }, 1000);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarUsuario();
  };

  return (
    <div className="CrearUsuario">
      <h1>Agregar Usuario</h1>
      {mensaje && (
        <div className="mensaje">
          <p>{mensaje}</p>
        </div>
      )}
      <div className="Pedir-container">
        <div className="Pedir">
          <form onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
            />
            <label htmlFor="apPat">Apellido Paterno:</label>
            <input
              type="text"
              id="apPat"
              name="apPat"
              value={usuario.apPat}
              onChange={handleChange}
            />
            <label htmlFor="apMat">Apellido Materno:</label>
            <input
              type="text"
              id="apMat"
              name="apMat"
              value={usuario.apMat}
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={usuario.password}
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
            />
            <label htmlFor="superUser">Super Usuario:</label>
            <select
              id="superUser"
              name="superUser"
              value={usuario.superUser}
              onChange={handleChange}
            >
              <option value={false}>No</option>
              <option value={true}>Sí</option>
            </select>
            <button type="submit" className="superUserBtn">Agregar</button>
            <Link to="/usuario">
              <button className="superUserBtn">Regresar</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearUsuario;
