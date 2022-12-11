import Formulario from "../components/Formulario"
import ListaPacientes from "../components/ListaPacientes"
import { useState } from 'react'

const AministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false)


  return (
    <div className="flex flex-col md:flex-row mx-10">
      <button
        type="button"
        className="bg-indigo-600 text-white font-bold uppercase rounded-xl p-3 mx-10 mb-10 md:hidden"
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
      >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
      <div className={`${mostrarFormulario ? 'block' : 'hidden'} md:w-1/2 lg:w-2/5 md:block `}>
        <Formulario />
      </div>
      <div className="md:w-1/2 lg:w-3/5">
        <ListaPacientes />
      </div>
    </div>
  )
}

export default AministrarPacientes