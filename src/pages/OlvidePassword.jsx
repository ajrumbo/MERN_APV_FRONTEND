import { Link } from 'react-router-dom'
import { useState } from 'react'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'


const OlvidePassword = () => {

  const [email,setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if( email === '' ){
      setAlerta({msg: 'El email es olbigatorio', error: true});
      return;
    }

    setAlerta({});

    try {
      await clienteAxios.post('/veterinarios/olvide-password',{email});
      setAlerta({
        msg: 'Se ha enviado un correo con las instrucciones. Revisa tu email',
        error: false
      });
      setEmail('');
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
            <h1 className='text-indigo-600 text-6xl font-black'>Recupera tu Acceso y no pierdas <span className='text-black'> tus Pacientes</span> </h1>
        </div>
        <div className='my-5'>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
              <form 
                onSubmit={handleSubmit}
              >
                {msg &&
                  <Alerta 
                    alerta={alerta}
                  />
                }
                <div>
                  <label htmlFor="email" className='uppercase text-gray-600 block text-xl font-bold'>
                    Email
                  </label>
                  <input 
                    type="email" 
                    id='email'
                    placeholder='Email'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value = { email }
                    onChange = { e => setEmail(e.target.value) }
                  />
                </div>
                <input 
                  type="submit"
                  value='enviar'
                  className='uppercase bg-indigo-600 py-3 rounded-xl mt-5 text-white w-full hover:bg-indigo-800 hover:cursor-pointer font-bold'
                />
              </form>
            </div>
            <nav className='mt-10 flex items-center flex-col lg:items-start md:items-start'>
              <Link to='/registrar' className='my-3 text-gray-500 hover:text-black'>
                ¿No tienes una cuenta? Regístrate
              </Link>
              <Link to='/' className='my-5 text-gray-500 hover:text-black'>
                ¿Ya tienes una cuenta? Inicia Sesión
              </Link>
            </nav>
        </div>
    </>
  )
}

export default OlvidePassword