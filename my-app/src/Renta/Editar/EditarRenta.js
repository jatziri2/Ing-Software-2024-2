import "./EditarRenta.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function EditarRenta({ rentas, setRentas }) {
  const [rentaSeleccionada, setRentaSeleccionada] = useState(null);
  const [datosRenta, setDatosRenta] = useState(null);
  const [rentaModificada, setRentaModificada] = useState(false);
  const navegar = useNavigate();

  const seleccionarRenta = (evento) => {
    const idRenta = evento.target.value;
    const renta = rentas.find((renta) => renta.idRentar === parseInt(idRenta));
    setRentaSeleccionada(renta);
    setDatosRenta({ ...renta });
  };

  const cambiarDatosRenta = (evento) => {
    const { name, value, type, checked } = evento.target;
    setDatosRenta((datosAnteriores) => ({
      ...datosAnteriores,
      [name]: type === "checkbox" ? checked : value,
      estatus: name === "estatus" ? value === "ENTREGADA" : false,
    }));
  };

  const modificarRenta = () => {
    const idRentar = rentaSeleccionada.idRentar;
    const rentaModificada = { ...datosRenta, estatus: datosRenta.estatus ? "ENTREGADA" : "SIN ENTREGAR" };
    const nuevasRentas = rentas.map((renta) =>
      renta.idRentar === idRentar ? rentaModificada : renta
    );
    setRentas(nuevasRentas);
    setRentaModificada(true);
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    modificarRenta();
  };

  const manejarOkClick = () => {
    navegar("/renta");
  };

  const fechaFormateada = (fecha) => {
    const fechaDate = new Date(fecha);
    fechaDate.setDate(fechaDate.getDate() + 1);
    return fechaDate.toLocaleDateString();
  };

  return (
    <div className="EditarRenta">
      <h1>Actualizar Renta</h1>
      {!rentaSeleccionada && (
        <div className="mensaje">
          <div className="caja">
            <br />
            <label htmlFor="rentaSelect">Selecciona una renta para modificar</label>
            <br />
            <div className="custom-select-container">
              <select className="custom-select" id="rentaSelect" onChange={seleccionarRenta}>
                <option value="">Selecciona una renta</option>
                {rentas.map((renta) => (
                  <option key={renta.idRentar} value={renta.idRentar}>
                    {renta.idRentar} - {fechaFormateada(renta.fecha_renta)}
                  </option>
                ))}
              </select>
            </div>
            <div className="section">
              <ul className="botC">
                <Link to="/renta">
                  <button>Regresar</button>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      )}
      {rentaModificada && (
        <div className="Cajita-container">
          <div className="Cajita">
            <p>Renta modificada de forma exitosa</p>
            <div className="section">
              <ul className="botC">
                <button onClick={manejarOkClick}>Ok</button>
              </ul>
            </div>
          </div>
        </div>
      )}
      {rentaSeleccionada && !rentaModificada && (
        <div className="formulario">
          <form onSubmit={manejarEnvio}>
            <div className="Pedir-container">
              <div className="Pedir">
                <br />
                <label htmlFor="idUsuario">ID del Usuario:</label>
                <input type="text" id="idUsuario" name="idUsuario" value={datosRenta.idUsuario} readOnly />
                <br />
                <label htmlFor="idPelicula">ID de la Película:</label>
                <input type="text" id="idPelicula" name="idPelicula" value={datosRenta.idPelicula} readOnly />
                <br />
                <label htmlFor="fecha_renta">Fecha de Renta:</label>
                <input type="text" id="fecha_renta" name="fecha_renta" value={fechaFormateada(datosRenta.fecha_renta)} readOnly />
                <br />
                <label htmlFor="dias_de_renta">Días de Renta:</label>
                <input type="number" id="dias_de_renta" name="dias_de_renta" value={Math.max(1, datosRenta.dias_de_renta)} onChange={cambiarDatosRenta} />
                <br />
                <label htmlFor="estatus">Estado:</label>
                <select id="estatus" name="estatus" value={datosRenta.estatus ? "ENTREGADA" : "SIN ENTREGAR"} onChange={cambiarDatosRenta}>
                  <option value="ENTREGADA">Entregada</option>
                  <option value="SIN ENTREGAR">Sin Entregar</option>
                </select>
                <br />
                <div className="section">
                  <ul className="botC">
                    <button type="submit" disabled={JSON.stringify(rentaSeleccionada) === JSON.stringify(datosRenta)}>
                      Guardar Cambios
                    </button>
                  </ul>
                </div>
                <div className="section">
                  <ul className="botC">
                    <Link to="/renta">
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

export default EditarRenta;
