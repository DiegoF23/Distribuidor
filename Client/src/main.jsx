import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApiProvider } from './contexts/api/ApiContext.jsx'
import App from './App.jsx'
import './styles/style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApiProvider>
      <App />
      </ApiProvider>
  </StrictMode>,
)
