import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import App from './App'
import About from './routes/About'
import Projects from './routes/Projects'
import Resume from './routes/Resume'
import Contact from './routes/Contact'

import './styles/tokens.css'
import './styles/global.css'
import './styles/routes.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/about" replace /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      { path: 'resume', element: <Resume /> },
      { path: 'contact', element: <Contact /> },
      { path: '*', element: <Navigate to="/about" replace /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
