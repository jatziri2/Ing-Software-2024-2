import {peliculas, usuarios, rentas} from './Data.js'

export function crearPelicula(nombrePelicula, generoPelicula, duracionPelicula, inventarioPelicula){
    peliculas.push({
        idPelicula: peliculas.length + 1,
        nombre: nombrePelicula,
        genero: generoPelicula,
        duracion: duracionPelicula,
        inventario: inventarioPelicula
    })
    alert('Pelicula registrada')
}

export function crearUsuario(nombreUsuario, apellidoPaterno, apellidoMaterno, contraseña, email, superUser){
    usuarios.push({
        idUsuario: usuarios.length + 1,
        nombre: nombreUsuario,
        apPat: apellidoPaterno,
        apMat: apellidoMaterno,
        password: contraseña,
        email: email,
        profilePicture: null,
        superUser: superUser
    })
    alert('Usuario registrado')
}

export function crearRenta(idUsuario, idPelicula, fechaRenta, dias, estadoPelicula){
    rentas.push({
        idRentar: rentas.length + 1,
        idUsuario: idUsuario,
        idPelicula: idPelicula,
        fecha_renta: new Date(fechaRenta),
        dias_de_renta: dias,
        estatus: estadoPelicula
    })
    alert('Renta registrada')
}

export function laPeliculaEstaRegistrada(idMovie){
    return peliculas.find(movie => movie.idPelicula === idMovie)
}

export function usuarioRegistrado(idUser){
    return usuarios.find(user => user.idUsuario === idUser)
}

export function rentaRegistrada(idRent){
    return rentas.find(rent => rent.idRentar === idRent)
}

export function editarUsuario(idUser, nombreUsuario, apellidoPaterno, apellidoMaterno, contraseña, email, superUser){
    const user = usuarioRegistrado(idUser)
    if(user){
        const index = usuarios.indexOf(user)
        const newUser = {
            idUsuario: idUser,
            nombre: nombreUsuario,
            apPat: apellidoPaterno,
            apMat: apellidoMaterno,
            password: contraseña,
            email: email,
            profilePicture: null,
            superUser: superUser
        }
        usuarios[index] = newUser
        alert('Usuario actualizado correctamente')
    }else{
        alert('El usuario no existe')
    }
}

export function editarPelicula(movieId,nombrePelicula, generoPelicula, duracionPelicula, inventarioPelicula){
    const movie = laPeliculaEstaRegistrada(movieId)
    if (movie){
        const index = peliculas.indexOf(movie)
        const newMovie = {
            idPelicula: movieId,
            nombre: nombrePelicula,
            genero: generoPelicula,
            duracion: duracionPelicula,
            inventario: inventarioPelicula
        }
        peliculas[index] = newMovie
        alert('Pelicula actualizada correctamente')
    }else{
        alert('La pelicula no existe')
    }
}

export function editarRenta(rentId, estadoPelicula){
    console.log(rentId)
    console.log(estadoPelicula)
    const rent = isRentRegistered(rentId)
    console.log(rent)
    if(rent){
        const index = rentas.indexOf(rent)
        rentas[index].estatus= estadoPelicula
        alert('Renta actualizada correctamente')
    }else{
        alert('La renta no existe')
    }
}

export function peliculaEliminada(movieId){
    const movie = isMovieRegistered(movieId)
    if(movie){
        const index = peliculas.indexOf(movie)
        peliculas.splice(index, 1)
        alert('Pelicula eliminada')
    }else{
        alert('La pelicula no existe')
    }
}

export function usuarioEliminado(userId){
    const user = isUserRegistered(userId)
    if(user){
        const index = usuarios.indexOf(user)
        usuarios.splice(index, 1)
        alert('Usuario elominad')
    }else{
        alert('The user does not exist')
    }
}