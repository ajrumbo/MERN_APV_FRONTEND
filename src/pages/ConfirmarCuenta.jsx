import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);

  const params = useParams();

  const {id} = params;

  useEffect(() => {
    const confirmar = async () => {
      try {
        
        const url = `/veterinarios/confirmar/${id}`;
        
        const {data} = await clienteAxios(url);
        //console.log(data)
        
        setCuentaConfirmada(true);
        setAlerta({msg: data.msg, error: false})
        
      } catch (error) {
        //console.log(error);
        setAlerta({msg: error.response.data.msg, error: true})
      }

      setCargando(false);

    }
    confirmar();
  }, [])


  return (
    <>
      <div>
        <h1 className='text-indigo-600 text-6xl font-black'>Confirma tu cuenta y comienza a administrar <span className='text-black'>tus Pacientes</span> </h1>
      </div>
      
      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {!cargando && 
          <Alerta 
            alerta = {alerta}
          />
        }
        <nav className='mt-10 flex items-center flex-col lg:items-start md:items-start'>
          {cuentaConfirmada &&
          
            <Link to='/' className='my-3 items-center text-gray-500 hover:text-black'>
              Iniciar Sesión
            </Link>
          
          }
        </nav>
      </div>
      
    </>
  )
}

export default ConfirmarCuenta