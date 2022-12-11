import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Header = () => {

  const {cerrarSesion} = useAuth()

  return (
    <header className='py-10 bg-indigo-600'>
        <div className='container mx-auto flex flex-col lg:flex-row justify-around items-center'>
            <h1 className='font-bold text-2xl text-center text-indigo-200'>Administrador de Pacientes de 
            {' '}
                <span className='text-white font-black'>Veterinaria</span>
            </h1>
            <nav className='flex gap-4 mt-5 lg:mt-0'>
                <Link to='/admin' className='text-white uppercase font-bold text-sm'>Pacientes</Link>
                <Link to='/admin/perfil' className='text-white uppercase font-bold text-sm'>Perfil</Link>
                <button type='button' onClick={cerrarSesion} className='text-white uppercase font-bold text-sm'>Cerrar sesión</button>
            </nav>
        </div>
        
    </header>
  )
}

export default Header