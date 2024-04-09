import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Indice from "../Indice/Indice";
import Usuario from "../Usuario/Usuario";
import LeerUsuario from "../Usuario/Leer/LeerUsuario";
import CrearUsuario from "../Usuario/Crear/CrearUsuario";
import EditarUsuario from "../Usuario/Editar/EditarUsuario";
import EliminarUsuario from "../Usuario/Eliminar/EliminarUsuario";
import Pelicula from "../Pelicula/Pelicula";
import LeerPelicula from "../Pelicula/Leer/LeerPelicula";
import CrearPelicula from "../Pelicula/Crear/CrearPelicula";
import EditarPelicula from "../Pelicula/Editar/EditarPelicula";
import EliminarPelicula from "../Pelicula/Eliminar/EliminarPelicula";

function App() {
  const [usuarios, setUsuarios] = useState([
      { idUsuario: 1, nombre: "Alejandro", apPat: "González", apMat: "Martínez", password: "abc123", email: "alejandro@example.com", superUser: false },
      { idUsuario: 2, nombre: "Valeria", apPat: "Fernández", apMat: "López", password: "valeria2023", email: "valeria@example.com", superUser: true },
      { idUsuario: 3, nombre: "Roberto", apPat: "Sánchez", apMat: "Gómez", password: "pass1234", email: "roberto@example.com", superUser: false },
      { idUsuario: 4, nombre: "Laura", apPat: "García", apMat: "Hernández", password: "lauraPass", email: "laura@example.com", superUser: false },
      { idUsuario: 5, nombre: "Elena", apPat: "Pérez", apMat: null, password: "elenita123", email: "elena@example.com", superUser: false },
      { idUsuario: 6, nombre: "Hugo", apPat: "Rodríguez", apMat: "Santos", password: "hugoPass", email: "hugo@example.com", superUser: false },
      { idUsuario: 7, nombre: "Sofía", apPat: "Martínez", apMat: "Díaz", password: "sofiaPass", email: "sofia@example.com", superUser: true },
      { idUsuario: 8, nombre: "Diego", apPat: "López", apMat: null, password: "diego123", email: "diego@example.com", superUser: false },
      { idUsuario: 9, nombre: "María", apPat: "Gómez", apMat: "Fernández", password: "mariaPass", email: "maria@example.com", superUser: false },
      { idUsuario: 10, nombre: "Pablo", apPat: "Hernández", apMat: null, password: "pabloPass", email: "pablo@example.com", superUser: false }
  ]);

  const [peliculas, setPeliculas] = useState([
      { idPelicula: 1, nombre: "La vida secreta de las mascotas", genero: "Animacion", duracion: 99, inventario: 5 },
      { idPelicula: 2, nombre: "El padrino", genero: "Drama", duracion: 175, inventario: 1 },
      { idPelicula: 3, nombre: "Jurassic Park", genero: "Accion", duracion: 127, inventario: 3 },
      { idPelicula: 4, nombre: "Los increíbles", genero: "Animacion", duracion: 115, inventario: 2 },
      { idPelicula: 5, nombre: "Harry Potter y la piedra filosofal", genero: "Fantasia", duracion: 152, inventario: 4 },
      { idPelicula: 6, nombre: "Forrest Gump", genero: "Drama", duracion: 142, inventario: 1 },
      { idPelicula: 7, nombre: "Matrix", genero: "Ciencia Ficcion", duracion: 136, inventario: 0 },
      { idPelicula: 8, nombre: "Toy Story", genero: "Animacion", duracion: 181, inventario: 10 },
      { idPelicula: 9, nombre: "El club de la pelea", genero: "Drama", duracion: 139, inventario: 2 },
      { idPelicula: 10, nombre: "La guerra de las galaxias: Episodio IV - Una nueva esperanza", genero: "Ciencia Ficcion", duracion: 121, inventario: 3 }    
  ]);

  const [rentas, setRentas] = useState([
      { idRentar: 1, idUsuario: 8, idPelicula: 2, fecha_renta: new Date("2023-05-15"), dias_de_renta: 4, estatus: true },
      { idRentar: 2, idUsuario: 5, idPelicula: 7, fecha_renta: new Date("2022-08-20"), dias_de_renta: 6, estatus: false },
      { idRentar: 3, idUsuario: 9, idPelicula: 5, fecha_renta: new Date("2023-11-25"), dias_de_renta: 2, estatus: true },
      { idRentar: 4, idUsuario: 10, idPelicula: 8, fecha_renta: new Date("2024-02-12"), dias_de_renta: 3, estatus: false },
      { idRentar: 5, idUsuario: 1, idPelicula: 6, fecha_renta: new Date("2022-07-07"), dias_de_renta: 5, estatus: true }
  ]);

  return (
    <Router>
      <Routes>
        {/* Rutas relacionadas con Usuarios */}
        <Route exact path="/" element={<Indice />} />
        <Route
          path="/usuario"
          element={
            <Usuario usuarios={usuarios} setUsuarios={setUsuarios} rentas={rentas}
            />
          }
        />
        <Route
          path="/usuario/ver"
          element={
            <LeerUsuario usuarios={usuarios} setUsuarios={setUsuarios} rentas={rentas}
            />
          }
        />
         <Route
          path="/usuario/agregar"
          element={<CrearUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
        />
        <Route
          path="/usuario/editar"
          element={<EditarUsuario usuarios={usuarios} setUsuarios={setUsuarios} />}
        />
        <Route
          path="/usuario/eliminar"
          element={
            <EliminarUsuario usuarios={usuarios} setUsuarios={setUsuarios} rentas={rentas}
            />
          }
        />
        <Route
          path="/pelicula"
          element={
            <Pelicula peliculas={peliculas} setPeliculas={setPeliculas} rentas={rentas}
            />
          }
        />
        <Route
          path="/pelicula/ver"
          element={
            <LeerPelicula peliculas={peliculas} setPeliculas={setPeliculas} rentas={rentas}
            />
          }
        />
        <Route
          path="/pelicula/agregar"
          element={
            <CrearPelicula peliculas={peliculas} setPeliculas={setPeliculas} />
          }
        />
        <Route
          path="/pelicula/editar"
          element={
            <EditarPelicula peliculas={peliculas} setPeliculas={setPeliculas} />
          }
        />
        <Route
          path="/pelicula/eliminar"
          element={
            <EliminarPelicula peliculas={peliculas} setPeliculas={setPeliculas} rentas={rentas}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

