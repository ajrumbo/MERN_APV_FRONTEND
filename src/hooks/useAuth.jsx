import { useContext } from 'react' //Para extraer los datos del context
import AuthContext from '../context/AuthProvider' //El context que contiene los datos

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth