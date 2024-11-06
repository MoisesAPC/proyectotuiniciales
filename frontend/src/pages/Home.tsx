import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'

// Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

// Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'

import Menu from '../components/Menu'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
  const userData = useSelector((state: RootState) => state.authenticator)
  // Comprobamos por la consola qué obtenemos del store
  console.log(userData)

  const handleSubmit = (e: any) => {
    // Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault();

    dispatch(authActions.logout())
    navigate('/')
  };

  return (
    <>
      <Typography variant="h2" color="primary.main">
          Página Home de Moisés Antonio Pestano Castro

          <br />
          <br />

          Logueado como usuario {userData.userName}, con rol de {userData.userRol}
      </Typography>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleSubmit}
        >
          SALIR
        </Button>
      </div>

      <Menu/>
    </>
  );
}

export default Home;
