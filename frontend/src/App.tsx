import Login from './pages/Login'
import Home from './pages/Home'
import Reports from './pages/Reports'
import ErrorPage from './pages/ErrorPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import GestionUsuariosPage from './pages/GestionUsuariosPage'

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Login/>
      },
      {
        path: 'home',
        element: <Home/>
      },
      {
        path: 'reports',
        element: <Reports/>
      },
      {
        path: 'gestion_usuarios',
        element: <GestionUsuariosPage/>
      }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
