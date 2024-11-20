import { Stack, Button, Tooltip } from '@mui/material';
import { useState } from 'react';

import Menu from '../components/Menu'
import InformeColeccion from '../components/InformeColeccion'

function Reports() {
  // Variable que se pone a 'true' cuando le damos al botón de INFORME COLECCION
  const [botonInformeColeccionPulsado, setBotonInformeColeccionPulsado] = useState(false);

  const [tableData, setTableData] = useState([])

  // Función que hace el fetch al backend y obtiene los datos de la tabla
  async function obtenerDatosEnTablaColeccionReports () {
    fetch(`http://localhost:3030/getItems`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (SELECT tabla coleccion): ')
      console.log(response.data)
      
      setTableData(response.data)
    })
  }

  const handleInformeColeccion = () => {
    setBotonInformeColeccionPulsado(true)
    obtenerDatosEnTablaColeccionReports()
  };

  return (
    <>
      <Stack spacing={5}>
        <Menu />

        <Tooltip title="Generar informe" placement="top" arrow>
          <Button variant='contained' onClick={handleInformeColeccion} fullWidth>
            INFORME COLLECION
          </Button>
        </Tooltip>

        {botonInformeColeccionPulsado && (
          <InformeColeccion tableData={tableData} />
        )}
      </Stack>
    </>
  );
}

export default Reports;
