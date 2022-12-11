import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import {useState} from 'react'
import useAuth from "../hooks/useAuth"


const CambiarPassword = () => {

  const {guardarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    passwordNuevo:  '',
    repetirPassword: '',
    passwordActual: ''
  });
 
  const handleSubmit = async e => {
    e.preventDefault();

    const{passwordNuevo,repetirPassword,passwordActual} = password

    if( Object.values(password).some(campo => campo === '') ){
      setAlerta({msg: 'Todos los datos son obligatorios', error: true});
      return
    }

    if( passwordNuevo !== repetirPassword ){
      setAlerta({msg: 'Las contraseñas no coinciden', error: true});
      return
    }

    if( passwordNuevo.length < 6 ){
      setAlerta({msg: 'La contraseña es demasiado corta. Debe contener mínimo 6 caracteres', error: true});
      return
    }

    setAlerta({});

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);

  }

  const {msg} = alerta

  return (
    <>
        <AdminNav/>

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Contraseña</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}
            <span className="text-indigo-600 font-bold">Contraseña aquí</span>
        </p>

        <div className="flex justify-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5">
                
                <form
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label 
                            htmlFor="nombre"
                            className="uppercase font-bold text-gray-600"
                        >Contraseña Actual:</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Contraseña Actual"
                            name="passwordActual"
                            id="passwordActual"
                            // value={perfil.nombre || ''}
                            onChange={e => setPassword({
                                ...password,
                                [e.target.id]: e.target.value
                            })}
                        />
                    </div>

                    <div className="my-3">
                        <label 
                            htmlFor="nombre"
                            className="uppercase font-bold text-gray-600"
                        >Nueva Contraseña:</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Nueva Contraseña"
                            name="passwordNuevo"
                            id="passwordNuevo"
                            // value={perfil.nombre || ''}
                            onChange={e => setPassword({
                                ...password,
                                [e.target.id]: e.target.value
                            })}
                        />
                    </div>
                    <div className="my-3">
                    <label 
                            htmlFor="web"
                            className="uppercase font-bold text-gray-600"
                        >Repetir Contraseña:</label>
                        <input 
                            type="password" 
                            className="border bg-gray-50 w-full p-2 mt-5 rounded-lg"
                            placeholder="Repetir Contraseña"
                            id="repetirPassword"
                            name="repetirPassword"
                            // value={perfil.web || ''}
                            onChange={e => setPassword({
                                ...password,
                                [e.target.id]: e.target.value
                            })}
                        />
                    </div>

                    <input 
                        type="submit" 
                        value="Actualizar Contraseña"
                        className='bg-indigo-600 rounded-xl w-full p-3 text-white uppercase font-black hover:bg-indigo-800 hover:cursor-pointer active:bg-indigo-600 transition-colors my-5'
                    />

                    {msg &&
                        <Alerta
                            alerta={alerta}
                        />
                    }
                </form>
                
            </div>
        </div>
    </>
  )
}

export default CambiarPassword