import { Link,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';
import useAuth from '../hooks/useAuth';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('APV_TOKEN_LOGIN');
    if(token){
      navigate("/admin")
    }
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if( [email,password].includes('') ){
      setAlerta({msg: 'Todos los datos son obligatorios', error: true});
      return
    }
  
    if( password.length < 6 ){
      setAlerta({msg: 'La contraseña es demasiado corta. Debe contener mínimo 6 caracteres', error: true});
      return
    }

    //Se envían los datos de inicio de sesión
    try {
      const url = `/veterinarios/login`;
      const {data} = await clienteAxios.post(url,{email,password});

      localStorage.setItem('APV_TOKEN_LOGIN', data.token);
      setAlerta({msg: 'Inicio de sesión Correcto', error: false});
      
      setAuth(data)

      navigate("/admin")
      
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const {msg} = alerta;

  return (
    <>
        <div>
            <h1 className='text-indigo-600 text-6xl font-black'>Inicia Sesión y administra <span className='text-black'> tus Pacientes</span> </h1>
        </div>
        <div className='my-5'>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
              {msg &&
                <Alerta 
                  alerta={alerta}
                />
              }
              <form 
                onSubmit={handleSubmit}
              >
                <div>
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
                <input 
                  type="submit"
                  value='Iniciar Sesión'
                  className='uppercase bg-indigo-600 py-3 rounded-xl mt-5 text-white w-full hover:bg-indigo-800 hover:cursor-pointer font-bold'
                />
              </form>
            </div>
            <nav className='mt-10 flex items-center flex-col lg:items-start md:items-start'>
              <Link to='/registrar' className='my-3 text-gray-500 hover:text-black'>
                ¿No tienes una cuenta? Regístrate
              </Link>
              <Link to='/olvide-password' className='my-5 text-gray-500 hover:text-black'>
                Olvide mi contraseña
              </Link>
            </nav>
        </div>
    </>
  )
}

export default Login