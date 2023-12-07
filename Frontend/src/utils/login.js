
export const guardarDatos = (datos) => {

    const datosString = JSON.stringify(datos)

    localStorage.setItem('usuario', datosString)

}

export const obtenerDatos = () => {

    const datosString = localStorage.getItem('usuario')

    return JSON.parse(datosString)

}

export const guardarToken = (token) => {

    localStorage.setItem('token', token)

}

export const obtenerToken = () => {

    return localStorage.getItem('token')

}

export const limpiarLocalStorage = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('usuario')


}
