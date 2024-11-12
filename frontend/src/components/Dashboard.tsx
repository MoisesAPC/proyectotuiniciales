import { Box } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Alert } from '@mui/material';
//Para usar el useEffect debemos importarlo
import { useEffect } from 'react';

function Dashboard() {

    // Con el useEffect, podemos hacer que al cargarse la página, se actualice la tabla
    // con los datos provenientes de la base de datos
    useEffect(() => {
      obtenerDatosEnTablaColeccion();
    }, []);

  const [alertInfo, setAlertInfo] = useState({ show: false, message: '', severity: 'success' });

  /* FUNCIONES Y VARIABLES DEL FORMULARIO */

  // Datos del formulario {Nombre, Marca, Tipo}
  const [formValido, setFormValido] = useState(false);  // Para comprobar que todos los campos required hayan sido rellenados previamente

  // Si todos los campos con "required" han sido rellenados
  // "esValido" pasará a ser a true, activando el botón de Enviar
  const validarFormulario = (nombre: string, marca: string, tipo: string) => {
    const esValido =
      nombre.trim() !== '' &&
      marca.trim() !== '' &&
      tipo.trim() !== '';
    setFormValido(esValido);
  };

  const handleChangeNombre = (e: { target: { value: string; }; }) =>{
    setItem({
      ...item,
      nombre: e.target.value
    });

    validarFormulario(e.target.value, item.marca, item.tipo);
  };

  const handleChangeMarca = (e: { target: { value: string; }; }) =>{
    setItem({
      ...item,
      marca: e.target.value
    });

    validarFormulario(item.nombre, e.target.value, item.tipo);
  };

  const handleChangeTipo = (e: { target: { value: string; }; }) =>{
    setItem({
      ...item,
      tipo: e.target.value
    });

    validarFormulario(item.nombre, item.marca, e.target.value);
  };

  const handleChangePrecio = (e: { target: { value: any; }; }) =>{
    setItem({
      ...item,
      precio: e.target.value
    });
  };

  const handleInsertarDatos = (e: { preventDefault: () => void; }) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga
    e.preventDefault();

    insertarDatosEnTablaColeccion();

    limpiarContenidos();
  };

  const handleDeleteItem = (id: number) => {
    borrarDatosEnTablaColeccion(id);

    limpiarContenidos();
  };

  // Limpia los contenidos de las textboxes, las encuestas, etc
  const limpiarContenidos = () => {
    setItem({nombre: '', marca: '', tipo: '', precio: 0});
    setFormValido(false);
  };

  /* FUNCIONES Y VARIABLES DE ACCESO A BASE DE DATOS */

  // Función que hace el fetch al backend y obtiene los datos de la tabla
  async function obtenerDatosEnTablaColeccion () {
    fetch(`http://localhost:3030/getItems`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (SELECT tabla coleccion): ')
      console.log(response.data)
      
      setTableData(response.data)
    })
  }

  // Función que hace el fetch al backend e inserta los datos de la tabla
  async function insertarDatosEnTablaColeccion () {
    fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (INSERCIÓN tabla coleccion): ')
      console.log(response)

      obtenerDatosEnTablaColeccion()

      if (response > 0) {
        setAlertInfo({ show: true, message: 'Datos guardados con éxito', severity: 'success' });
      }
      else {
        setAlertInfo({ show: true, message: 'ERROR: No se pudieron insertar los datos', severity: 'error' });
      }
    })
  }

  // Función que hace el fetch al backend y borra una fila de la tabla
  async function borrarDatosEnTablaColeccion (id: number) {
    fetch(`http://localhost:3030/deleteItem?id=${id}`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (DELETE tabla coleccion): ')
      console.log(response)

      obtenerDatosEnTablaColeccion()

      if (response > 0) {
        setAlertInfo({ show: true, message: 'Datos borrados con éxito', severity: 'success' });
      }
      else {
        setAlertInfo({ show: true, message: 'ERROR: No se pudieron borrar los datos', severity: 'error' });
      }
    })
  }


  /* FUNCIONES Y VARIABLES ASOCIADOS A LA TABLA */


    // Creamos el tipo itemtype. Este tipo será un objeto con un id opcional de tipo number
    // nombre, marca y tipo de tipo string y el precio de tipo number
    interface itemtype {
        id?: number
        nombre: string
        marca: string
        tipo: string
        precio: number
    }

    // Inicializo los valores del item. Aquí no pongo el id porque no lo necesito
    const itemInitialState: itemtype = {
        nombre: ' ',
        marca: ' ',
        tipo: ' ',
        precio: 0
    }

    // Cuando declaremos el useState del item en nuestro código:
    const [item, setItem] = useState(itemInitialState)

    const [tableData, setTableData] = useState([])

    return (
        <Box
          component='form'
        >
          <Grid container spacing={2}>
            {/* Campo Nombre */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Nombre'
                variant='outlined'
                fullWidth
                value={item.nombre}
                onChange={handleChangeNombre}
              />
            </Grid>

            {/* Campo Marca */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Marca'
                variant='outlined'
                fullWidth
                value={item.marca}
                onChange={handleChangeMarca}
              />
            </Grid>

            {/* Campo Tipo */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Tipo'
                variant='outlined'
                fullWidth
                value={item.tipo}
                onChange={handleChangeTipo}
              />
            </Grid>

            {/* Campo Precio */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                type="number"
                required
                label='Precio'
                variant='outlined'
                fullWidth
                value={item.precio}
                inputProps={{ min: 0 }} // Así hacemos que el campo del precio no acepte números negativos
                onChange={handleChangePrecio}
              />
            </Grid>

            {/* Botón de insertar datos */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <Button variant='contained' fullWidth onClick={handleInsertarDatos} disabled={!formValido}>
                + INSERTAR DATOS
              </Button>
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
              <Table aria-label='Tabla colección'>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'blue' }}>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Nombre</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Marca</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Tipo</TableCell>
                    <TableCell sx={{ color: 'primary', fontWeight: 'bold' }}>Precio</TableCell>
                  </TableRow>
                </TableHead>

                {/* Body */}
                <TableBody>
                  {tableData.map((row: itemtype) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <Button onClick={() => handleDeleteItem(row.id)}>
                          <DeleteForeverIcon />
                        </Button>
                      </TableCell>

                      <TableCell>{row.nombre}</TableCell>

                      <TableCell>{row.marca}</TableCell>

                      <TableCell>{row.tipo}</TableCell>

                      <TableCell>{row.precio} €</TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

          </Grid>
        </Box>
    );
}

export default Dashboard;
