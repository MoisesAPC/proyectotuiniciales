import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Drawer from '@mui/material/Drawer';
// Importamos el useSelector del react-redux
import { useSelector } from 'react-redux'
// Importamos lo que necesitamos para el tipo del selector()
import { RootState} from '../store/index'
//Para usar el useEffect debemos importarlo
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Importamos el useDispatch del react-redux
import { useDispatch} from 'react-redux'
// Importamos las acciones que están en el fichero authSlice.ts
import { authActions } from '../store/authSlice';

function Menu() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [open, setOpen] = React.useState(false);

  // Almacenamos en la variable userData lo que obtenemos del store usando el hook useSelector
  const userData = useSelector((state: RootState) => state.authenticator)

  //Trozo de código donde vamos a usar el useEffect(): siempre los hooks van al principio del componente
  //Antes de esto tendremos que coger del store los datos
  const isLoggedIn = userData.isAutenticated;

  useEffect(() => {
    if (!isLoggedIn) {
     navigate('/')
    }
  }, [isLoggedIn, navigate])

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSalir = (e: any) => {
    // Para que no mande el formulario, sino que haga lo que yo le diga.
    e.preventDefault();

    dispatch(authActions.logout())
    navigate('/')
  };

  // Menú hamburguesa
  const DrawerList = (
    <Box sx={{ maxwidth: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        
          {/* Inicio */}
          <Link to='/home' style={{textDecoration:'none', color:'black'}}>
            <ListItem disablePadding>
              <ListItemButton>

                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>

                {/* Ponemos el texto de inicio en negrita y en blanco (obtenido del color primario de nuestro tema personalizado) */}
                <ListItemText primary="Inicio" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

              </ListItemButton>
            </ListItem>
          </Link>

          {/* Informes */}
          <Link to='/reports' style={{textDecoration:'none', color:'black'}}>
            <ListItem disablePadding>
              <ListItemButton>

                <ListItemIcon>
                  <ArticleIcon />
                </ListItemIcon>
                
                <ListItemText primary="Informes" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

              </ListItemButton>
            </ListItem>
          </Link>

          {/* Ayuda */}
          <ListItem disablePadding>
            <ListItemButton>

              <ListItemIcon>
                <HelpIcon />
              </ListItemIcon>
              
              <ListItemText primary="Ayuda" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

            </ListItemButton>
          </ListItem>

          {/* Salir */}
          <ListItem disablePadding>
            <ListItemButton>

              <ListItemIcon onClick={handleSalir}>
                <ExitToAppIcon />
              </ListItemIcon>
              
              <ListItemText primary="Salir" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

            </ListItemButton>
          </ListItem>
      </List>
    </Box>
    );

  
  console.log(userData)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">

          <Toolbar variant="dense">
            <IconButton edge="start" color="primary" onClick={toggleDrawer(true)} aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon/>
            </IconButton>

            <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              {userData.userName}
            </Typography>

            {/* Así mostramos el ícono del administrador solamente si el rol del usuario es de administrador */}
            {userData.userRol === "admin" && (
                <AdminPanelSettingsIcon />
            )}
          </Toolbar>

          <Drawer
            anchor="left"
            open={open}
            onClose={toggleDrawer(false)}
          >
            {DrawerList}
          </Drawer>

        </AppBar>
      </Box>
    </>
  );
}

export default Menu;
