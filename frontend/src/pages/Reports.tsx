import { Stack, Button, Tooltip } from '@mui/material';
import { useState } from 'react';

import Menu from '../components/Menu'
import InformeColeccion from '../components/InformeColeccion'
import InformeUsuarios from '../components/InformeUsuarios'

function Reports() {
  // Variable que se pone a 'true' cuando le damos al botón de INFORME COLECCION
  const [botonInformeColeccionPulsado, setBotonInformeColeccionPulsado] = useState(false);
  // Variable que se pone a 'true' cuando le damos al botón de INFORME USUARIOS
  const [botonInformeUsuariosPulsado, setBotonInformeUsuariosPulsado] = useState(false);

  const [tableDataColeccion, setTableColeccionData] = useState([])
  const [tableDataUsuarios, setTableUsuariosData] = useState([])

  // Función que hace el fetch al backend y obtiene los datos de la tabla
  async function obtenerDatosEnTablaColeccionReports () {
    fetch(`http://localhost:3030/getItems`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (SELECT tabla coleccion): ')
      console.log(response.data)
      
      setTableColeccionData(response.data)
    })
  }

  async function obtenerDatosEnTablaUsuariosReports () {
    fetch(`http://localhost:3030/getUsuarios`)
    .then(response => response.json())
    .then (response => {

      console.log('Lo que nos llega de la base de datos (SELECT tabla usuarios): ')
      console.log(response.data)
      
      setTableUsuariosData(response.data)
    })
  }

  const handleInformeColeccion = () => {
    setBotonInformeColeccionPulsado(true)
    obtenerDatosEnTablaColeccionReports()
  };

  const handleInformeUsuarios = () => {
    setBotonInformeUsuariosPulsado(true)
    obtenerDatosEnTablaUsuariosReports()
  };

  return (
    <>
      <Stack spacing={5}>
        <Menu />

        <Tooltip title="Generar informe de coleccion" placement="top" arrow>
          <Button variant='contained' onClick={handleInformeColeccion} fullWidth>
            INFORME COLLECION
          </Button>
        </Tooltip>

        <Tooltip title="Generar informe de usuarios" placement="top" arrow>
          <Button variant='contained' onClick={handleInformeUsuarios} fullWidth>
            INFORME USUARIOS
          </Button>
        </Tooltip>

        {botonInformeColeccionPulsado && (
          <InformeColeccion tableData={tableDataColeccion} />
        )}

        {botonInformeUsuariosPulsado && (
          <InformeUsuarios tableData={tableDataUsuarios} />
        )}
      </Stack>
    </>
  );
}

export default Reports;
