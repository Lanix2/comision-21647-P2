import { createContext, useContext, useState } from "react"
import { guardarDatos, obtenerDatos, guardarToken, obtenerToken, limpiarLocalStorage } from "../utils/login"


const AuthContext = createContext()

const AuthProvider = (props) => {

    const { children } = props

    const [usuario, setUsuraio] = useState(obtenerDatos())
    const [token, setToken] = useState(obtenerToken())

    const login = (datos, token) => {
        guardarDatos(datos)
        guardarToken(token)
        setUsuraio(datos)
        setToken(token)
    }

    const logout = () => {
        limpiarLocalStorage()
        setUsuraio(null)
        setToken(null)

    }

    return (
        <AuthContext.Provider value={{ token, usuario, login, logout }} >
            {children}
        </AuthContext.Provider >

    )
}

const useAuthContext = () => useContext(AuthContext);

export {
    AuthProvider,
    useAuthContext
}