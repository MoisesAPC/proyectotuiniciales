import { Container, Typography, TextField, Button, Stack, Box, Alert } from '@mui/material';
import { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  const bduser = 'moises';
  const bdpasswd = '1234';

  const [usuario, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

  const handleSubmit = (e: any) => {
    // Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault();
    
    if (usuario === bduser && password === bdpasswd) {
      setAlertInfo({ show: true, message: 'Login exitoso', severity: 'success' });
    }
    else {
      setAlertInfo({ show: true, message: 'Usuario o contraseña incorrectos', severity: 'error' });
    }
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
            value={usuario}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <TextField
            variant="outlined"
            required
            name="password"
            label="Contraseña"
            type="password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Acceder
          </Button>
        </Stack>
      </Box>

      {alertInfo.show && (
        <Alert severity={alertInfo.severity} sx={{ mt: 2 }}>
          {alertInfo.message}
        </Alert>
      )}
      
    </Container>
  );
}

export default Login;