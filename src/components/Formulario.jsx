import Alerta from "./Alerta"
import { useState } from 'react'
import usePacientes from '../hooks/usePacientes'
import { useEffect } from "react"

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [fecha, setFecha] = useState('')
    const [email, setEmail] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({});

    const { guardarPaciente, paciente } = usePacientes();


    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setEmail(paciente.email);
            setPropietario(paciente.propietario);
            setSintomas(paciente.sintomas);
            setFecha(new Date(paciente.fecha).toLocaleDateString('en-CA'));
            setId(paciente._id);
        }
    },[paciente])


    const reset = () => {
        setNombre('');
        setEmail('');
        setPropietario('');
        setSintomas('');
        setFecha('');
        setId('');
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if( [email,propietario,nombre,fecha,sintomas].includes('') ){
            setAlerta({msg: 'Todos los datos son obligatorios', error: true});
            return
        }

        setAlerta({})

        guardarPaciente({email,propietario,nombre,fecha,sintomas,id})
        reset();
    }

    const {msg} = alerta

  return (
    <>

        <h2 className="font-black text-3xl text-center">Administrador de Pacientes</h2>

        <p className='text-center mb-10 text-xl mt-5 '>
            Añade tus pacientes y {''}
            <span className='text-indigo-600 font-bold'>Adminístralos</span>
        </p>
        <form 
            onSubmit={handleSubmit}
            className='bg-white py-10 px-5 mb-10 lg:mb-10 shadow-md rounded-md'
        >
            
            <div className='mb-5'>
                <label 
                    htmlFor="nombre"
                    className='text-gray-700 uppercase font-bold'
                >Nombre Mascota</label>
                <input 
                    type="text" 
                    id="nombre" 
                    placeholder='Nombre de la Mascota'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="propietario"
                    className='text-gray-700 uppercase font-bold'
                >Nombre Propietario</label>
                <input 
                    type="text" 
                    id="propietario" 
                    placeholder='Nombre del Propietario'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={propietario}
                    onChange={e => setPropietario(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="email"
                    className='text-gray-700 uppercase font-bold'
                >Email</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder='Email'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="fecha"
                    className='text-gray-700 uppercase font-bold'
                >Fecha de Alta</label>
                <input 
                    type="date" 
                    id="fecha" 
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className='mb-5'>
                <label 
                    htmlFor="sintomas"
                    className='text-gray-700 uppercase font-bold'
                >Síntomas</label>
                <textarea 
                    id="sintomas" 
                    placeholder='Síntomas'
                    className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>

            <input 
                type="submit" 
                value={id ? "Guardar Cambios" : "Agregar Paciente"}
                className='bg-indigo-600 rounded-xl w-full p-3 text-white uppercase font-black hover:bg-indigo-800 hover:cursor-pointer active:bg-indigo-600 transition-colors'
            />
            
        </form>
        {msg && 
            <Alerta 
                alerta={alerta}
            />
        }
    </>
  )
}

export default Formulario