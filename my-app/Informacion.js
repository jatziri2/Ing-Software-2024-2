export let peliculas = [
    {idPelicula: 1, nombre: 'Avatar', genero: 'Aventura', duracion: 162, inventario: 8},
    {idPelicula: 2, nombre: 'Inception', genero: 'Ciencia Ficción', duracion: 148, inventario: 6},
    {idPelicula: 3, nombre: 'Interstellar', genero: 'Ciencia Ficción', duracion: 169, inventario: 9},
    {idPelicula: 4, nombre: 'The Shawshank Redemption', genero: 'Drama', duracion: 142, inventario: 3},
    {idPelicula: 5, nombre: 'The Dark Knight', genero: 'Acción', duracion: 152, inventario: 5},
    {idPelicula: 6, nombre: 'Pulp Fiction', genero: 'Crimen', duracion: 154, inventario: 7},
    {idPelicula: 7, nombre: 'Forrest Gump', genero: 'Drama', duracion: 142, inventario: 4},
    {idPelicula: 8, nombre: 'Fight Club', genero: 'Drama', duracion: 139, inventario: 2},
    {idPelicula: 9, nombre: 'The Matrix', genero: 'Ciencia Ficción', duracion: 136, inventario: 1},
    {idPelicula: 10, nombre: 'Inglourious Basterds', genero: 'Bélico', duracion: 153, inventario: 10}
]

export let usuarios = [
    {idUsuario: 1, nombre: 'Elena', apPat: 'Fernández', apMat: 'López', password: '1234', email: 'elena@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 2, nombre: 'Andrés', apPat: 'González', apMat: 'Martínez', password: 'abjs', email: 'andres@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 3, nombre: 'María José', apPat: 'Sánchez', apMat: 'Hernández', password: 'LKNDW8', email: 'mariajose@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 4, nombre: 'Diego', apPat: 'Hernández', apMat: 'García', password: 'kdhkj4', email: 'diego@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 5, nombre: 'Laura', apPat: 'García', apMat: 'Pérez', password: 'lsljnd', email: 'laura@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 6, nombre: 'Gabriel', apPat: 'Pérez', apMat: 'Manzano', password: 'kjsd', email: 'gabriel@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 7, nombre: 'Sara', apPat: 'Romero', apMat: 'Cabrera', password: ',nndbfb', email: 'sara@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 8, nombre: 'Carlos', apPat: 'Altamirano', apMat: 'Flores', password: 'aknndel', email: 'carlos@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 9, nombre: 'Fernanda', apPat: 'Gómez', apMat: 'López', password: 'ljdhi', email: 'fernanda@gmail.com', profilePicture: null, superUser: 0},
    {idUsuario: 10, nombre: 'Lucas', apPat: 'Blanco', apMat: 'Rodríguez', password: 'lkfjo', email: 'lucas@gmail.com', profilePicture: null, superUser: 1}
]

export let rentas = [
    {idRentar: 1, idUsuario: 1, idPelicula: 1, fecha_renta: new Date(2023, 8, 10), dias_de_renta: 7, estatus: 1},
    {idRentar: 2, idUsuario: 2, idPelicula: 2, fecha_renta: new Date(2022, 12, 5), dias_de_renta: 5, estatus: 1},
    {idRentar: 3, idUsuario: 3, idPelicula: 3, fecha_renta: new Date(2021, 11, 11), dias_de_renta: 3, estatus: 1},
    {idRentar: 4, idUsuario: 4, idPelicula: 4, fecha_renta: new Date(2021, 30, 11), dias_de_renta: 4, estatus: 1},
    {idRentar: 5, idUsuario: 5, idPelicula: 5, fecha_renta: new Date(2021, 9, 1), dias_de_renta: 6, estatus: 1},
    {idRentar: 6, idUsuario: 6, idPelicula: 6, fecha_renta: new Date(2020, 7, 14), dias_de_renta: 8, estatus: 1},
    {idRentar: 7, idUsuario: 7, idPelicula: 7, fecha_renta: new Date(2019, 8, 22), dias_de_renta: 2, estatus: 1},
    {idRentar: 8, idUsuario: 8, idPelicula: 8, fecha_renta: new Date(2019, 2, 26), dias_de_renta: 10, estatus: 1},
    {idRentar: 9, idUsuario: 9, idPelicula: 9, fecha_renta: new Date(2024, 6, 20), dias_de_renta: 1, estatus: 1},
    {idRentar: 10, idUsuario: 10, idPelicula: 10, fecha_renta: new Date(2023, 3, 7), dias_de_renta: 9, estatus: 1}
]
