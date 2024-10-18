import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Login from './pages/Login.tsx'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'

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

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <App />
      <Login />
    </ThemeProvider>
  </StrictMode>,
)
