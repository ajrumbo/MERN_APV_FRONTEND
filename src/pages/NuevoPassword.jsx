import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [exito, setExito] = useState(false);

  const [alerta,setAlerta] = useState({});

  const [nombre, setNombre] = useState('');
  

  //Primero se recibe el token de la url
  const params = useParams();

  const {token} = params;
  
  useEffect( () => {
    const verificar = async () =>{
      try {
        const url = `/veterinarios/olvide-password/${token}`;
        const respuesta = await clienteAxios(url);

        setNombre(respuesta.data.tokenValido.nombre);
      } catch (error) {
        setAlerta({msg: error.response.data.msg,error: true});
      }
    }
    verificar();
  }, []);

  const handleSubmit = async e =>{
    e.preventDefault();

    if( [password,repetirPassword].includes('') ){
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

    //Restablecer la contraseña
    try {
      const url = `/veterinarios/olvide-password/${token}`;
      await clienteAxios.post(url,{password});

      setAlerta({msg: 'Contraseña restablecida con éxito. Puedes iniciar sesión', error: false});
      setExito(true);
      setRepetirPassword('');
      setPassword('');
    } catch (error) {
      setAlerta({msg: error.response.data.msg,error: true});
    }

    //setAlerta({});
  }

  const {msg,error} = alerta;

  return (
    <>
      <div>
          <h1 className='text-indigo-600 text-6xl font-black'>{nombre !== '' && `Hola ${nombre},`} Restablece tu contraseña y no pierdas <span className='text-black'> tus Pacientes</span> </h1>
      </div>
      <div className='my-5'>
          <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

            {msg &&
              <Alerta 
                alerta={alerta}
              />
            }
            {nombre !== '' && (
              <form 
                onSubmit={handleSubmit}
              >
                
                <div className='my-5'>
                  <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>
                    Contraseña
                  </label>
                  <input 
                    type="password" 
                    id='password'
                    placeholder='Repetir Contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>
                <div className='my-5'>
                  <label htmlFor="password" className='uppercase text-gray-600 block text-xl font-bold'>
                    Repetir Contraseña
                  </label>
                  <input 
                    type="password" 
                    id='repetirpassword'
                    placeholder='Contraseña'
                    className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                    value={repetirPassword}
                    onChange={e => setRepetirPassword(e.target.value)}
                  />
                </div>
                <input 
                  type="submit"
                  value='Restablecer contraseña'
                  className='uppercase bg-indigo-600 py-3 rounded-xl mt-5 text-white w-full hover:bg-indigo-800 hover:cursor-pointer font-bold disabled:bg-indigo-400 disabled:cursor-not-allowed'
                  disabled= {exito}
                />
              </form>
            
            )}
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

export default NuevoPassword