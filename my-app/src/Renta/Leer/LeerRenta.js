import React from "react";
import { useNavigate } from "react-router-dom";
import "./LeerRenta.css";

const LeerRenta = ({ rentas }) => {
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        const fecha = new Date(dateString);
        fecha.setDate(fecha.getDate() + 1);
        return fecha.toLocaleDateString();
    };

    const handleRegresar = () => {
        navigate("/renta");
    };

    return (
        <div className="LeerRenta">
            <h1>Lista de Rentas</h1>
            <div className="tablecontainer">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ID del Usuario</th>
                            <th>ID de la Pelicula</th>
                            <th>Fecha de Renta</th>
                            <th>Dias de Renta</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rentas.map((renta) => (
                            <tr key={renta.idRentar}>
                                <td>{renta.idRentar}</td>
                                <td>{renta.idUsuario}</td>
                                <td>{renta.idPelicula}</td>
                                <td>{formatDate(renta.fecha_renta)}</td>
                                <td>{renta.dias_de_renta}</td>
                                <td>{renta.estatus ? "Entregada" : "Sin entregar"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="section">
                <ul className="botC">
                    <button onClick={handleRegresar} className="regresarBtn">Regresar</button>
                </ul>
            </div>
        </div>
    );
};

export default LeerRenta;
