import { useContext } from 'react' //Para extraer los datos del context
import PacientesContext from '../context/PacientesProvider' //El context que contiene los datos

const usePacientes = () => {
    return useContext(PacientesContext)
}

export default usePacientes