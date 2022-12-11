import usePacientes from '../hooks/usePacientes'

const Pacientes = ({paciente}) => {

    const { setEdicion, setDelete } = usePacientes()
    
    const { nombre, fecha, email, propietario, sintomas, _id } = paciente

    const formatearFecha = fecha => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat('es-CO', {dateStyle: 'long'}).format(nuevaFecha)
    }

    
  return (
    <div className='mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl'>
        <p className='font-bold uppercase text-indigo-600'>Nombre: {''}
            <span className='font-normal normal-case text-black'>{nombre}</span>
        </p>
        <p className='font-bold uppercase text-indigo-600'>Propietario: {''}
            <span className='font-normal normal-case text-black'>{propietario}</span>
        </p>
        <p className='font-bold uppercase text-indigo-600'>Email Contacto: {''}
            <span className='font-normal normal-case text-black'>{email}</span>
        </p>
        <p className='font-bold uppercase text-indigo-600'>Fecha de Alta: {''}
            <span className='font-normal normal-case text-black'>{formatearFecha(fecha)}</span>
        </p>
        <p className='font-bold uppercase text-indigo-600'>Síntomas: {''}
            <span className='font-normal normal-case text-black'>{sintomas}</span>
        </p>

        <div className='flex justify-between my-5 lg:flex-row sm:flex-col'>
            <button
                type='button'
                className='py-2 px-10 bg-indigo-600 hover:bg-indigo-800 active:bg-indigo-600 text-white rounded-lg uppercase font-bold sm:mb-5'
                onClick={() => setEdicion(paciente)}
            >Editar</button>
            <button
                type='button'
                className='py-2 px-10 bg-red-600 hover:bg-red-800 active:bg-red-600 text-white rounded-lg uppercase font-bold'
                onClick={() => setDelete(_id)}
            >Eliminar</button>
        </div>
    </div>
  )
}

export default Pacientes