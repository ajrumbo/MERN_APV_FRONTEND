import {useEffect,useState,createContext} from "react";
import clienteAxios from '../config/axios'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {


    const {auth} = useAuth()

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    const guardarPaciente = async paciente => {

        const token = localStorage.getItem('APV_TOKEN_LOGIN')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(paciente.id){
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config)

                const pacientesActualizado = pacientes.map( pacienteState => pacienteState._id === data._id ? data : pacienteState )
                setPacientes(pacientesActualizado)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }else{
            try {

                const {data} = await clienteAxios.post('/pacientes',paciente,config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data
    
                setPacientes([pacienteAlmacenado,...pacientes])
                
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }

    }

    const setEdicion = paciente => {
        setPaciente(paciente)
    }

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem('APV_TOKEN_LOGIN')
                if(!token)return 

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const {data} = await clienteAxios('/pacientes',config)
                setPacientes(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
        obtenerPacientes()
    }, [auth])

    const setDelete = async id => {
        const confirmar = confirm('Estás a punto de eliminar un registro, ¿Estás seguro?')
        if(confirmar){
            const token = localStorage.getItem('APV_TOKEN_LOGIN')
            if(!token)return 

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios.delete(`/pacientes/${id}`,config)

                const pacientesActualizado = pacientes.filter( paciente => paciente._id !== id)
                setPacientes(pacientesActualizado)
                //console.log(data)
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }

    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                setDelete
            }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext