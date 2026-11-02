import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ProjectsPage from './ProjectsPage.tsx'

const currentPath = window.location.pathname.replace(/\/+$/, '') || '/'
const page = currentPath === '/projects' ? <ProjectsPage /> : <App />

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {page}
  </StrictMode>,
)
