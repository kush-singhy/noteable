import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/styles.css'
import './styles/header.css'
import './styles/filters.css'
import './styles/bookgrid.css'
import './styles/media-queries.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
