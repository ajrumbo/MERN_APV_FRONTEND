import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

const AuthContext = createContext()

const AuthProvider = ({children}) => {


    const [auth, setAuth] = useState({})

    const [cargando, setCargando] = useState(true)

    
    useEffect(() =>{
        const autenticarUsuario = async () =>{
            
            const token = localStorage.getItem('APV_TOKEN_LOGIN');
            
            if(!token){
                setCargando(false)
                return
            }
            

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data.veterinario)
                
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        setAuth({})
        localStorage.removeItem('APV_TOKEN_LOGIN')
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('APV_TOKEN_LOGIN');

        if(!token){
            setCargando(false)
            return
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`

            const {data} = await clienteAxios.put(url,datos,config)

            return {
                msg: 'Usuario actualziado correctamente',
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const guardarPassword = async datos => {
        const token = localStorage.getItem('APV_TOKEN_LOGIN');

        if(!token){
            setCargando(false)
            return
        }
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put('/veterinarios/actualizar-password', datos, config)
            return {
                msg: data.msg,
                error: false
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }
    
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext