import {Link} from 'react-router-dom'

const AdminNav = () => {
  return (
    <nav className='flex gap-6 mx-16'>
        <Link 
            to="/admin/perfil"
            className='fint-bold uppercase text-gray-500'
        >Perfil</Link>
        <Link 
            to="/admin/cambiar-password"
            className='fint-bold uppercase text-gray-500'
        >Cambiar Contraseña</Link>
    </nav>
  )
}

export default AdminNav