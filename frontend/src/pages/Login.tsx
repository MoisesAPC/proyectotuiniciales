import { Container, Typography, TextField, Button, Stack, Box, Alert, Tooltip } from '@mui/material';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom'

// Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
// Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';


function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [data, setData] = useState({ user: '', password: '' });
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

  async function isVerifiedUser () {
    fetch(`http://localhost:3030/login?user=${data.user}&password=${data.password}`)
    .then(response => response.json())
    .then (response => {

      // "data" es lo que nos llega desde la base de datos (el nombre y el rol, cuando le hicimos el SELECT)
      console.log('Lo que nos llega de la base de datos: ')
      console.log(response.data)
      if (response.data.length !== 0) {
        setAlertInfo({ show: true, message: 'Login exitoso', severity: 'success' });

        // Aquí pongo el dispatch para cambiar el estado a login en el store del redux
        dispatch(authActions.login({
          name: data.user, // data.user es el nombre de usuario que ha ingresado el usuario
          rol: response.data.rol  // El rol proveniente de la base de datos
        }))

        navigate('/home')
      }
      else {
        setAlertInfo({ show: true, message: 'Usuario o contraseña incorrectos', severity: 'error' });
      }
    })
  }

  const handleSubmit = (e: any) => {
    // Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault();
    
    isVerifiedUser()

    console.log('Usuario: ', data.user)
    console.log('Contraseña: ', data.password)
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ my: 4 }}
      aria-label="Página de inicio de sesión"
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          borderRadius: 2,
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // sombreado del recuadro login
          backgroundColor: 'primary.light',
          color: 'primary.light',
        }}
      >
        <Typography variant="h4" color="primary.main">
          Sistema de Acceso
        </Typography>
        
        <LockIcon sx={{ fontSize: 40, mb: 2, color: 'info.main' }} />
        
        <Stack spacing={2} width="100%">
          <TextField
            variant="outlined"
            required
            id="usuario"
            label="Usuario"
            name="usuario"
            value={data.user}
            onChange={(e) => setData({ ...data, user: e.target.value })}
          />
          
          <TextField
            variant="outlined"
            required
            name="password"
            label="Contraseña"
            type="password"
            id="pass"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          
          <Tooltip title="Inicia sesión" placement="bottom" arrow>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
            >
              Acceder
            </Button>
          </Tooltip>
        </Stack>
      </Box>

      {/* SOLAMENTE ejecutaremos el componente "Alert" si la variable "alertInfo.show" está "true" */}
      {alertInfo.show && (
        <Alert severity={alertInfo.severity} sx={{ mt: 2 }}>
          {alertInfo.message}
        </Alert>
      )}
      
    </Container>
  );
}

export default Login;
