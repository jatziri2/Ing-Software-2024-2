import "./CrearUsuario.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function CrearUsuario({ usuarios, setUsuarios }) {
  const [usuario, setUsuario] = useState({nombre: "",apPat: "",apMat: "",password: "",email: "",superUser: false,
  });

  const [usuarioAgregado, setUsuarioAgregado] = useState(false);
  const [correoEnUso, setCorreoEnUso] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const verificarCorreoEnUso = () => {
    return usuarios.some((u) => u.email === usuario.email);
  };

  const agregarUsuario = () => {
    if (verificarCorreoEnUso()) {
      setCorreoEnUso(true);
    } else {
      const total = usuarios.length;
      const ultimoUsuario = usuarios[total - 1];
      const ultimoId = ultimoUsuario.idUsuario;
      const idUsuario = ultimoId + 1;
      const nuevoUsuario = { idUsuario, ...usuario };
      setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
      setUsuarioAgregado(true);
    }
  };

  const handleOkClick = () => {
    navigate("/usuario");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    agregarUsuario();
  };

  return (
    <div className="CrearUsuario">
      <h1>Agregar Usuario</h1>
      <div className="mensaje">
        {usuarioAgregado && (
          <div className="caja">
            <p>Usuario agregado</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Regresar</button>
              </ul>
            </div>
          </div>
        )}
        {correoEnUso && (
          <div className="caja">
            <p>Correo en uso, intente con otro</p>
            <div className="section">
              <ul className="botC">
                <button onClick={() => setCorreoEnUso(false)}>Regresar</button>
              </ul>
            </div>
          </div>
        )}
      </div>
      {!usuarioAgregado && !correoEnUso && (
        <div className="Pedir-container">
          <div className="Pedir">
            <br />
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">
                Nombre<span className="required"></span>:
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="apPat">
                Apellido Paterno<span className="required"></span>:
              </label>
              <input
                type="text"
                id="apPat"
                name="apPat"
                value={usuario.apPat}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="apMat">Apellido Materno:</label>
              <input
                type="text"
                id="apMat"
                name="apMat"
                value={usuario.apMat}
                onChange={handleChange}
              />
              <br />
              <label htmlFor="password">
                Contraseña<span className="required"></span>:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={usuario.password}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="email">
                Email<span className="required"></span>:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={usuario.email}
                onChange={handleChange}
                required
              />
              <br />
              <label htmlFor="superUser">Super Usuario:</label>
              <select
                id="superUser"
                name="superUser"
                value={usuario.superUser ? "Sí" : "No"}
                onChange={handleChange}
              >
                <option value="Sí">Sí</option>
                <option value="No">No</option>
              </select>
              <br />
              <div className="section">
                <ul className="botC">
                  <button>Agregar</button>
                </ul>
              </div>
            </form>
            <div className="section">
              <ul className="botC">
                <Link
                  to={{
                    pathname: "/usuario",
                    state: { usuarios, setUsuarios },
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

export default CrearUsuario;
