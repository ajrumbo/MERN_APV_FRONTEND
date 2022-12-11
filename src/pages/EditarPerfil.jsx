import AdminNav from "../components/AdminNav"
import { useState, useEffect } from 'react'
import useAuth from "../hooks/useAuth"
import Alerta from "../components/Alerta"

const EditarPerfil = () => {

    const {auth,actualizarPerfil} = useAuth()

    const [perfil, setPerfil] = useState({})

    const [alerta,setAlerta] = useState({})
    

    useEffect(() => {
        setPerfil(auth)
    }, [auth])

    const handleSubmit = async e => {
        e.preventDefault()

        const {nombre,email} = perfil

        if( [nombre,email].includes('') ){
            setAlerta({msg: 'El nombre y el email son datos obligatorios', error: true});
            return
        }

        setAlerta({})

        const respuesta = await actualizarPerfil(perfil)

        setAlerta(respuesta)
    }

    const {msg} = alerta

  return (
    <>
        <AdminNav/>
        <h2 className="font-black text-3xl text-center mt-10">Editar Perfil</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
            <span className="text-indigo-600 font-bold">Información aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label 
                            htmlFor="nombre"
                            className="uppercase font-bold text-gray-600"
                        >Nombre:</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Nombre"
                            name="nombre"
                            id="nombre"
                            value={perfil.nombre || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.id]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                    <label 
                            htmlFor="web"
                            className="uppercase font-bold text-gray-600"
                        >Sitio Web:</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Sitio Web"
                            id="web"
                            name="web"
                            value={perfil.web || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.id]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label 
                            htmlFor="telefono"
                            className="uppercase font-bold text-gray-600"
                        >Teléfono:</label>
                        <input 
                            type="text" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Teléfono"
                            id="telefono"
                            name="telefono"
                            value={perfil.telefono || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                        <label 
                            htmlFor=""
                            className="uppercase font-bold text-gray-600"
                        >Email:</label>
                        <input 
                            type="email" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Email"
                            id="email"
                            name="email"
                            value={perfil.email || ''}
                            onChange={e => setPerfil({
                                ...perfil,
                                [e.target.name]: e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Guardar Cambios"
                        className='bg-indigo-600 rounded-xl w-full p-3 text-white uppercase font-black hover:bg-indigo-800 hover:cursor-pointer active:bg-indigo-600 transition-colors my-5'
                    />

                    {msg &&
                        <Alerta
                            alerta={alerta}
                        />
                    }
                </form>
                
            </div>
        </div>
    </>
  )
}

export default EditarPerfil