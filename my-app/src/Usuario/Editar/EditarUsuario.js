import "./EditarUsuario.css"
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditarUsuario({ usuarios, setUsuarios }) {
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    apPat: "",
    apMat: "",
    password: "",
    email: "",
    superUser: "No", // Cambiado a un valor por defecto
  });

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(false);
  const [usuarioModificado, setUsuarioModificado] = useState(false);
  const [correoEnUso, setCorreoEnUso] = useState(false);
  const [datosFaltantes, setDatosFaltantes] = useState(false);
  const [cambiosRealizados, setCambiosRealizados] = useState(false); // Nuevo estado para rastrear cambios

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
    setCambiosRealizados(true); // Marcamos que se han realizado cambios al modificar algún campo
  };

  const verificarCorreoEnUso = () => {
    return usuarios.some(
      (u) =>
        u.email === datosUsuario.email &&
        u.idUsuario !== usuarioSeleccionado.idUsuario
    );
  };

  const verificarDatosFaltantes = () => {
    return (
      datosUsuario.nombre === "" ||
      datosUsuario.apPat === "" ||
      datosUsuario.password === "" ||
      datosUsuario.email === ""
    );
  };

  const modificarUsuario = () => {
    if (verificarDatosFaltantes()) {
      setDatosFaltantes(true);
    } else if (verificarCorreoEnUso()) {
      setCorreoEnUso(true);
    } else {
      const index = usuarios.findIndex(
        (usuario) => usuario.idUsuario === usuarioSeleccionado.idUsuario
      );
      const idUsuario = usuarioSeleccionado.idUsuario;
      const usuarioModi = { idUsuario, ...datosUsuario };
      usuarios[index] = usuarioModi;
      setUsuarioModificado(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    modificarUsuario();
  };

  const handleOkClick = () => {
    navigate("/usuario");
  };

  const handleOkClick2 = () => {
    setCorreoEnUso(false);
  };

  const handleOkClick3 = () => {
    setDatosFaltantes(false);
  };

  return (
    <div className="EditarUsuario">
      <h1>Modificar Usuario</h1>
      {!usuarioSeleccionado && (
        <div className="mensaje">
          <div className="caja">
            <br></br>
            <label htmlFor="usuarioSelect">
              Selecciona un usuario para modificar
            </label>
            <br></br>
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
      {usuarioModificado && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Usuario modificado</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {correoEnUso && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Correo en uso, intente con otro</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick2}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {datosFaltantes && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>
              Por favor complete los campos de nombre, apellido paterno,
              contraseña y correo electrónico
            </p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick3}>Regresar</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {usuarioSeleccionado &&
        !usuarioModificado &&
        !correoEnUso &&
        !datosFaltantes && (
          <div className="formulario">
            <form onSubmit={handleSubmit}>
              <div className="Pedir-container">
                <div className="Pedir">
                  <br></br>
                  <label htmlFor="nombre">
                    Nombre<span className="required">*</span>:
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={datosUsuario.nombre}
                    onChange={handleChange}
                    required
                  />
                  <br></br>
                  <label htmlFor="apPat">
                    Apellido Paterno<span className="required">*</span>:
                  </label>
                  <input
                    type="text"
                    id="apPat"
                    name="apPat"
                    value={datosUsuario.apPat}
                    onChange={handleChange}
                    required
                  />
                  <br></br>
                  <label htmlFor="apMat">Apellido Materno:</label>
                  <input
                    type="text"
                    id="apMat"
                    name="apMat"
                    value={datosUsuario.apMat}
                    onChange={handleChange}
                  />
                  <br></br>
                  <label htmlFor="password">
                    Contraseña<span className="required">*</span>:
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={datosUsuario.password}
                    onChange={handleChange}
                    required
                  />
                  <br></br>
                  <label htmlFor="email">
                    Email<span className="required">*</span>:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={datosUsuario.email}
                    onChange={handleChange}
                    required
                  />
                  <br></br>
                  <label htmlFor="superUser">Super Usuario:</label>
                  <select
                    id="superUser"
                    name="superUser"
                    value={datosUsuario.superUser}
                    onChange={handleChange}
                  >
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </select>
                  <br></br>
                  <div className="section">
                    <ul className="botC">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!cambiosRealizados} // Deshabilita el botón si no hay cambios realizados
                      >
                        Guardar Cambios
                      </button>
                    </ul>
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
            </form>
          </div>
        )}
    </div>
  );
}

export default EditarUsuario;
