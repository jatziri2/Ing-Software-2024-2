import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./EliminarUsuario.css";

function EliminarUsuario({ usuarios, setUsuarios, rentas }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const navigate = useNavigate();

  const handleUsuarioSeleccionado = (event) => {
    const usuarioId = event.target.value;
    const usuario = usuarios.find(
      (usuario) => usuario.idUsuario === parseInt(usuarioId)
    );
    setUsuarioSeleccionado(usuario);
  };

  const eliminarUsuario = () => {
    const usuarioConRenta = rentas.some(
      (renta) => renta.idUsuario === usuarioSeleccionado.idUsuario
    );
    if (!usuarioConRenta) {
      const nuevasUsuarios = usuarios.filter(
        (usuario) => usuario.idUsuario !== usuarioSeleccionado.idUsuario
      );
      setUsuarios(nuevasUsuarios);
      setUsuarioSeleccionado(null);
    }
  };

  const handleCancelarClick = () => {
    setUsuarioSeleccionado(null);
  };

  const handleOkClick = () => {
    navigate("/usuario");
  };

  return (
    <div className="EliminarUsuario">
      <h1>Eliminar Usuario</h1>
      {!usuarioSeleccionado && (
        <div className="Cajita-container">
          <div className="Cajita">
            <br />
            <label htmlFor="usuarioSelect">
              Seleccione un usuario para eliminar
            </label>
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
                    state: { usuarios, setUsuarios, rentas },
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
        <div className="Cajita-container">
          <div className="Cajita">
            {rentas.some((renta) => renta.idUsuario === usuarioSeleccionado.idUsuario) ? (
              <div>
                <p className="mensaje-rojo">
                  El usuario no se puede eliminar, está rentando.
                </p>
                <div className="section">
                  <ul className="botC">
                    <Link
                      to={{
                        pathname: "/usuario",
                        state: { usuarios, setUsuarios, rentas },
                      }}
                    >
                      <button>Regresar</button>
                    </Link>
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <p>¿Seguro/a de eliminar al usuario?</p>
                <p>
                  {usuarioSeleccionado.nombre} {usuarioSeleccionado.apPat}{" "}
                  {usuarioSeleccionado.apMat}{" "}
                </p>
                <div className="section">
                  <ul className="botC">
                    <button onClick={eliminarUsuario}>Eliminar</button>
                    <button onClick={handleCancelarClick}>Cancelar</button>
                    <Link
                      to={{
                        pathname: "/usuario",
                        state: { usuarios, setUsuarios, rentas },
                      }}
                    >
                      <button className="regresarBtn">Regresar</button>
                    </Link>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarUsuario;
