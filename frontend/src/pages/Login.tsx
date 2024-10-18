import { Container, Typography, Button, Stack } from '@mui/material';

function Login() {
  return (
    <Container sx={{ my: 4 }}>
    <Stack spacing={2}>
        <Typography variant="h1" color="primary">
            h1, color "primary" (color primario de la aplicación)
        </Typography>
        
        <Typography variant="h2" color="secondary">
            h2, color "secondary" (color secundario de la aplicación)
        </Typography>
        
        <Typography variant="h3" color="error">
            h3, color "error" (color de error, rojo)
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary">
            subtitle1, color "text.secondary" (color secundario del texto)
        </Typography>
        
        <Typography variant="body1" color="text.primary">
        body1, color "text.primary" (color primario del texto)
        </Typography>
        
        <Typography variant="caption" color="text.disabled">
            caption, color "text.disabled"
        </Typography>
        
        <Button variant="text" color="primary">
            Botón 1 (color primary)
        </Button>
        
        <Button variant="contained" color="secondary">
            Botón 2 (color secondary)
        </Button>
        
        <Button variant="outlined" color="error">
            Botón 3 (color error)
        </Button>
        
        <Button variant="contained" color="success">
            Botón 4 (color success)
        </Button>
      </Stack>
    </Container>
  );
};

export default Login;
