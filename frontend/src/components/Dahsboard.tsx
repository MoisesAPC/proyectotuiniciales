import { Box } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Dashboard() {

  // Datos del formulario {Nombre, Marca, Tipo}
  const [data, setData] = useState({nombre:'', marca:'', tipo:'', precio:'0.00'})
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
    setData({
      ...data,
      nombre: e.target.value
    });

    validarFormulario(e.target.value, data.marca, data.tipo);
  };

  const handleChangeMarca = (e: { target: { value: string; }; }) =>{
    setData({
      ...data,
      marca: e.target.value
    });

    validarFormulario(data.nombre, e.target.value, data.tipo);
  };

  const handleChangeTipo = (e: { target: { value: string; }; }) =>{
    setData({
      ...data,
      tipo: e.target.value
    });

    validarFormulario(data.nombre, data.marca, e.target.value);
  };

  const handleChangePrecio = (e: { target: { value: any; }; }) =>{
    setData({
      ...data,
      precio: e.target.value
    });
  };

  const handleInsertarDatos = (e: { preventDefault: () => void; }) => {
    //Para que no mande el formulario, sino que haga lo que yo le diga
    e.preventDefault();

    console.log({
      ...data
    });

    limpiarContenidos();
  };

  // Limpia los contenidos de las textboxes, las encuestas, etc
  const limpiarContenidos = () => {
    setData({nombre: '', marca: '', tipo: '', precio: '0.00'});
    setFormValido(false);
  };


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

    const handleDeleteItem = (e: itemtype) =>{
      
    };

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
                value={data.nombre}
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
                value={data.marca}
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
                value={data.tipo}
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
                value={data.precio}
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

            {/* Línea divisora */}
            <Grid size={12}>
              <Divider />
            </Grid>

            {/* Tabla */}
            {/* Cabecera */}
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
                    <Button onClick={() => handleDeleteItem(row)}>
                      <DeleteForeverIcon />
                    </Button>
                  </TableCell>

                  <TableCell>{row.nombre}</TableCell>

                  <TableCell>{row.marca}</TableCell>

                  <TableCell>{row.tipo}</TableCell>

                  <TableCell>{row.precio}</TableCell>

                </TableRow>
              ))}
            </TableBody>

          </Grid>
        </Box>
    );
}

export default Dashboard;
