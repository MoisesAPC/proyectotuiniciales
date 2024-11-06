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
import Drawer from '@mui/material/Drawer';

function Menu() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // Menú hamburguesa
  const DrawerList = (
    <Box sx={{ maxwidth: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to={'/home'} style={{textDecoration:'none', color:'black'}}>
          {/* Inicio */}
          <ListItem disablePadding>
            <ListItemButton>

              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>

              {/* Ponemos el texto de inicio en negrita y en blanco (obtenido del color primario de nuestro tema personalizado) */}
              <ListItemText primary="Inicio" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

            </ListItemButton>
          </ListItem>

          {/* Informes */}
          <ListItem disablePadding>
            <ListItemButton>

              <ListItemIcon>
                <ArticleIcon />
              </ListItemIcon>
              
              <ListItemText primary="Informes" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

            </ListItemButton>
          </ListItem>

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

              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              
              <ListItemText primary="Salir" sx={{ fontWeight: 'bold', color: 'primary.dark' }}/>

            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Box>
    );   

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">

        <Toolbar variant="dense">
          <IconButton edge="start" color="primary" onClick={toggleDrawer(true)} aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Photos
          </Typography>
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
  );
}

export default Menu;
