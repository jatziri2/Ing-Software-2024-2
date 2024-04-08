import "./EliminarUsuario.css";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EliminarUsuario({ usuarios, setUsuarios, rentas }) {
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(false);
  const [usuarioEliminado, setUsuarioEliminado] = useState(false);
  const [usuarioConRenta, setUsuarioConRenta] = useState(false);

  const navigate = useNavigate();

  const handleUsuarioSeleccionado = (event) => {
    const usuarioId = event.target.value;
    const usuario = usuarios.find(
      (usuario) => usuario.idUsuario === parseInt(usuarioId)
    );
    setUsuarioSeleccionado(usuario);
  };

  const verificarUsuarioConRenta = () => {
    return rentas.some(
      (renta) => renta.idUsuario === usuarioSeleccionado.idUsuario
    );
  };

  const eliminarUsuario = () => {
    if (verificarUsuarioConRenta()) {
      setUsuarioConRenta(true);
    } else {
      const nuevasUsuarios = usuarios.filter(
        (usuario) => usuario.idUsuario !== usuarioSeleccionado.idUsuario
      );
      setUsuarios(nuevasUsuarios);
      setUsuarioEliminado(true);
    }
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
            <br></br>
            <label htmlFor="usuarioSelect">
              Seleccione un usuario para eliminar
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
      {usuarioEliminado && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Usuario eliminado</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Ok</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {usuarioConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>El usuario no se puede eliminar, esta rentando.</p>
            <div className="section">
              <ul className="botC">
                <button onClick={handleOkClick}>Ok</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {usuarioSeleccionado && !usuarioEliminado && !usuarioConRenta && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>¿Seguro/a de eliminar al usuario?</p>
            <p>{usuarioSeleccionado.nombre}{" "}{usuarioSeleccionado.apPat}{" "}
              {usuarioSeleccionado.apMat}{" "}</p>
            <div className="section">
              <ul className="botC">
                <button onClick={eliminarUsuario}>Eliminar</button>
              </ul>
              <ul className="botC">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default EliminarUsuario;