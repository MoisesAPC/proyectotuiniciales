import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// Importamos el componente Provider de la librearía react-redux
import { Provider } from 'react-redux'
// Importamos el componente store que definimos en el fichero ./store/index
import { store } from './store/index'

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#000000',
      dark: '#ffffff',
    },
    secondary: {
      main: '#dede1b',
    },
    background: {
      default: '#2f2f2f',
      paper: '#000000',
    },
    error: {
      main: '#ff2717',
    },
    success: {
      main: '#30c336',
    },
  },
 })

// Todo el código que tenían de otras importaciones y el código de createTheme lo dejan como está.
// Finalmente escribimos lo siguiente: lo que está en púrpura es lo que añadí a lo que ya estaba.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
