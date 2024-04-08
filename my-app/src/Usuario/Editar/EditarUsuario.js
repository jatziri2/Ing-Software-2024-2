import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EditarUsuario.css";

function EditarUsuario({ usuarios, setUsuarios }) {
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",apPat: "",apMat: "",password: "",email: "",superUser: false,
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();

  const handleUsuarioSeleccionado = (event) => {
    const usuarioId = event.target.value;
    const usuario = usuarios.find(
      (usuario) => usuario.idUsuario === parseInt(usuarioId)
    );
    setUsuarioSeleccionado(usuario);
    setDatosUsuario({ ...usuario });
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setDatosUsuario((prevDatosUsuario) => ({
      ...prevDatosUsuario,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const modificarUsuario = () => {
    if (!datosUsuario.nombre || !datosUsuario.apPat || !datosUsuario.password || !datosUsuario.email) {
      setMensaje("Por favor complete todos los campos.");
    } else if (usuarios.some((u) => u.email === datosUsuario.email && u.idUsuario !== usuarioSeleccionado.idUsuario)) {
      setMensaje("El correo electrónico ya está en uso.");
    } else {
      const index = usuarios.findIndex(
        (usuario) => usuario.idUsuario === usuarioSeleccionado.idUsuario
      );
      const idUsuario = usuarioSeleccionado.idUsuario;
      const usuarioModi = { idUsuario, ...datosUsuario };
      usuarios[index] = usuarioModi;
      setMensaje("Usuario actualizado correctamente.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    modificarUsuario();
  };

  const handleOkClick = () => {
    setMensaje("");
    navigate("/usuario");
  };

  return (
    <div className="EditarUsuario">
      <h1>Editar Usuario</h1>
      {!usuarioSeleccionado && (
        <div className="mensaje">
          <div className="caja">
            <br />
            <label htmlFor="usuarioSelect">Selecciona un usuario para editar</label>
            <br />
            <div className="custom-select-container">
              <select
                className="custom-select"
                id="usuarioSelect"
                onChange={handleUsuarioSeleccionado}
              >
                <option value="">Seleccionar usuario</option>
                {usuarios.map((usuario) => (
                  <option key={usuario.idUsuario} value={usuario.idUsuario}>
                    {usuario.idUsuario} - {usuario.nombre} - {usuario.email}
                  </option>
                ))}
              </select>
            </div>
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
      {usuarioSeleccionado && (
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
                  value={datosUsuario.nombre}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="apPat">Apellido Paterno:</label>
                <input
                  type="text"
                  id="apPat"
                  name="apPat"
                  value={datosUsuario.apPat}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="apMat">Apellido Materno:</label>
                <input
                  type="text"
                  id="apMat"
                  name="apMat"
                  value={datosUsuario.apMat}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="password">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={datosUsuario.password}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={datosUsuario.email}
                  onChange={handleChange}
                />
                <br />
                <label htmlFor="superUser">Super Usuario:</label>
                <select
                  id="superUser"
                  name="superUser"
                  value={datosUsuario.superUser}
                  onChange={handleChange}
                >
                  <option value={false}>No</option>
                  <option value={true}>Sí</option>
                </select>
                <br />
                <div className="section">
                  <ul className="botC">
                    <button type="submit" className="superUserBtn">Guardar Cambios</button>
                    <Link
                      to={{
                        pathname: "/usuario",
                        state: { usuarios, setUsuarios },
                      }}
                    >
                      <button className="regresarBtn">Regresar</button>
                    </Link>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {mensaje && (
        <div className="mensaje">
          <div className="caja">
            <p>{mensaje}</p>
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

export default EditarUsuario;
