import { Stack, Button } from '@mui/material';
import { useState } from 'react';

import Menu from '../components/Menu'
import InformeColeccion from '../components/InformeColeccion'

function Reports() {
  // Variable que se pone a 'true' cuando le damos al botón de INFORME COLECCION
  const [botonInformeColeccionPulsado, setBotonInformeColeccionPulsado] = useState(false);

  const handleInformeColeccion = () => {
    setBotonInformeColeccionPulsado(true)
  };

  return (
    <>
      <Stack spacing={5}>
        <Menu />

        <Button variant='contained' onClick={handleInformeColeccion} fullWidth>
          INFORME COLLECION
        </Button>

        {botonInformeColeccionPulsado && (
          <InformeColeccion />
        )}
      </Stack>
    </>
  );
}

export default Reports;
