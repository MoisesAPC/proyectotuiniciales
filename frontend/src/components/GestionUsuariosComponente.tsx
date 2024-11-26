import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Alert } from '@mui/material';
//Para usar el useEffect debemos importarlo
import { useEffect } from 'react';
// Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el rol del selector()
import { RootState} from '../store/index'

function GestionUsuariosComponente() {

  // Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
  const userData = useSelector((state: RootState) => state.authenticator)

    // Con el useEffect, podemos hacer que al cargarse la página, se actualice la tabla
    // con los datos provenientes de la base de datos
    useEffect(() => {
      obtenerDatosEnTablaUsuarios();
    }, []);

  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

  /* FUNCIONES Y VARIABLES DEL FORMULARIO */

  // Para comprobar que todos los campos required hayan sido rellenados previamente
  const [formValido, setFormValido] = useState(false);

  // Si todos los campos con "required" han sido rellenados
  // "esValido" pasará a ser a true, activando el botón de Insertar Usuario
  const validarFormulario = (login: string, password: string, rol: string) => {
    const esValido =
      login.trim() !== '' &&
      password.trim() !== '' &&
      rol.trim() !== '';
    setFormValido(esValido);
  };

  const handleChangeLogin = (e: { target: { value: string; }; }) =>{
    setUser({
      ...user,
      login: e.target.value
    });

    validarFormulario(e.target.value, user.password, user.rol);
  };

  const handleChangePassword = (e: { target: { value: string; }; }) =>{
    setUser({
      ...user,
      password: e.target.value
    });

    validarFormulario(user.login, e.target.value, user.rol);
  };

  const handleChangeRol = (e: { target: { value: string; }; }) =>{
    setUser({
      ...user,
      rol: e.target.value
    });

    validarFormulario(user.login, user.password, e.target.value);
  };

  const handleInsertarUsuario = (e: { preventDefault: () => void; }) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga
    e.preventDefault();

    insertarDatosEnTablaUsuarios();

    limpiarContenidos();
  };

  // Limpia los contenidos de las textboxes, las encuestas, etc
  const limpiarContenidos = () => {
    setUser({login: '', password: '', rol: ''});
    setFormValido(false);
  };

  /* FUNCIONES Y VARIABLES DE ACCESO A BASE DE DATOS */

  // Función que hace el fetch al backend y obtiene los datos de la tabla
  async function obtenerDatosEnTablaUsuarios () {
    fetch(`http://localhost:3030/getUsuarios`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (SELECT tabla usuarios): ')
      console.log(response.data)
      
      setTableData(response.data)
    })
  }

  // Función que hace el fetch al backend e inserta los datos de la tabla usuarios
  async function insertarDatosEnTablaUsuarios () {
    fetch(`http://localhost:3030/addUsuario?login=${user.login}&password=${user.password}&rol=${user.rol}`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (INSERCIÓN tabla usuarios): ')
      console.log(response)

      // Actualizamos la tabla con los datos nuevos
      obtenerDatosEnTablaUsuarios()

      // Si "response > 0", significa que se han insertado datos correctamente, donde
      // "response" es el número de filas afectadas (véase "return result.affectedRows" en users.js)
      if (response > 0) {
        setAlertInfo({ show: true, message: 'Usuario guardado con éxito', severity: 'success' });
      }
      else {
        setAlertInfo({ show: true, message: 'ERROR: No se pudieron insertar los datos del usuario', severity: 'error' });
      }
    })
  }


  /* FUNCIONES Y VARIABLES ASOCIADOS A LA TABLA */


    // Creamos el rol itemtype. Este rol será un objeto con un id opcional de rol number
    // login, password y rol de rol string y el precio de rol number
    interface itemtype {
        id?: number
        login: string
        password: string
        rol: string
    }

    // Inicializo los valores del user. Aquí no pongo el id porque no lo necesito
    const itemInitialState: itemtype = {
        login: ' ',
        password: ' ',
        rol: ' '
    }

    // Cuando declaremos el useState del user en nuestro código:
    const [user, setUser] = useState(itemInitialState)

    const [tableData, setTableData] = useState([])

    return (
        <Box
          component='form'
        >
          {/* Con esto agrega un espaciado antes del formulario (un margen superior) */}
          <Grid container>
            <Grid item xs={12}>
              <Box mt={7} />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {/* Campo Login */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Login'
                variant='outlined'
                fullWidth
                value={user.login}
                onChange={handleChangeLogin}
              />
            </Grid>

            {/* Campo Password */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Password'
                variant='outlined'
                fullWidth
                value={user.password}
                onChange={handleChangePassword}
              />
            </Grid>

            {/* Campo Rol */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Rol'
                variant='outlined'
                fullWidth
                value={user.rol}
                onChange={handleChangeRol}
              />
            </Grid>

            {/* Botón de insertar usuario */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <Tooltip title="Inserta datos a la tabla Usuarios" placement="bottom" arrow>
                <Button variant='contained' fullWidth onClick={handleInsertarUsuario} disabled={!formValido}>
                  + INSERTAR USUARIO
                </Button>
              </Tooltip>
            </Grid>

            {/* SOLAMENTE ejecutaremos el componente "Alert" si la variable "alertInfo.show" está "true" */}
            {alertInfo.show && (
              <Alert severity={alertInfo.severity} sx={{ mt: 2 }}>
                {alertInfo.message}
              </Alert>
            )}

            {/* Línea divisora */}
            <Grid size={12}>
              <Divider />
            </Grid>

            {/* Tabla */}
            {/* Cabecera */}
            <TableContainer>
              <Table aria-label='Tabla de usuarios'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'blue' }}>
                  <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Eliminar</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Login</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Password</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Rol</TableCell>
                  </TableRow>
                </TableHead>

                {/* Body */}
                <TableBody>
                  {tableData.map((row: itemtype) => (
                    <TableRow key={row.id}>

                      <TableCell>{row.login}</TableCell>

                      <TableCell>{row.password}</TableCell>

                      <TableCell>{row.rol}</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        </Box>
    );
}

export default GestionUsuariosComponente;
