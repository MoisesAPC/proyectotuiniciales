import { Box } from '@mui/material';
import { useState } from 'react';
import Grid from '@mui/material/Grid2'
import TextField from '@mui/material/TextField'

function Dashboard() {

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
              />
            </Grid>

            {/* Campo Marca */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Marca'
                variant='outlined'
                fullWidth
              />
            </Grid>

            {/* Campo Tipo */}
            <Grid size={{ xs: 12, md: 10, lg: 5, xl: 6 }}>
              <TextField 
                required
                label='Tipo'
                variant='outlined'
                fullWidth
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
              />
            </Grid>
          </Grid>
        </Box>
    );

}

export default Dashboard;
