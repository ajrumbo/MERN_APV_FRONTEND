import {useState} from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const resetForm = () => {
    setNombre('');
    setEmail('');
    setPassword('');
    setRepetirPassword('');
  }

  const handleSubmit = async e => {

    e.preventDefault();

    if( [nombre,email,password,repetirPassword].includes('') ){
      setAlerta({msg: 'Todos los datos son obligatorios', error: true});
      return
    }

    if( password !== repetirPassword ){
      setAlerta({msg: 'Las contraseñas no coinciden', error: true});
      return
    }

    if( password.length < 6 ){
      setAlerta({msg: 'La contraseña es demasiado corta. Debe contener mínimo 6 caracteres', error: true});
      return
    }

    setAlerta({});
    
    
    //Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre,email,password});
      setAlerta({
        msg: 'Usuario resgistrado correctamente. Revisa tu correo',
        error: false
      });
      resetForm();
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }

    

  }

  const { msg } = alerta

  return (
    <>
      <div>
        <h1 className='text-indigo-600 text-6xl font-black'>Crea tu cuenta y administra <span className='text-black'>tus Pacientes</span> </h1>
      </div>
      <div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
          <form 
            id='formulario'
            onSubmit={handleSubmit}
          >
            
            {msg && <Alerta
              alerta={alerta}
            />}

            <div className='my-5'>
              <label htmlFor="nombre" className='uppercase text-gray-600 block text-xl font-bold'>
                Nombre
              </label>
              <input 
                type="text" 
                id='nombre'
                placeholder='Nombre'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>
                Email
              </label>
              <input 
                type="email" 
                id='email'
                placeholder='Email'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>
                Contraseña
              </label>
              <input 
                type="password" 
                id='password'
                placeholder='Contraseña'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className='my-5'>
              <label htmlFor="repetirpassword" className='uppercase text-gray-600 block text-xl font-bold'>
                Confirmar Contraseña
              </label>
              <input 
                type="password" 
                id='repetirpassword'
                placeholder='Confirmar Contraseña'
                className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
              />
            </div>
            <input 
              type="submit"
              value='Registrarse'
              className='uppercase bg-indigo-600 py-3 rounded-xl mt-5 text-white w-full hover:bg-indigo-800 hover:cursor-pointer font-bold'
            />
          </form>
        </div>
        <nav className='mt-10 flex items-center flex-col lg:items-start md:items-start'>
          <Link to='/' className='my-3 text-gray-500 hover:text-black'>
            ¿Ya tienes una cuenta? Inicia Sesión
          </Link>
          <Link to='/olvide-password' className='my-5 text-gray-500 hover:text-black'>
            Olvide mi contraseña
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar