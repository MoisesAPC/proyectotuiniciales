// Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'

import Menu from '../components/Menu'

function Home() {
  // Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
  const userData = useSelector((state: RootState) => state.authenticator)
  // Comprobamos por la consola qué obtenemos del store
  console.log(userData)

  return (
    <>
      <Menu/>
    </>
  );
}

export default Home;
