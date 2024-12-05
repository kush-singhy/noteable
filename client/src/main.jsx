import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './pages/App.jsx';

import './index.css';
import './styles/styles.css';
import './styles/header.css';
import './styles/filters.css';
import './styles/bookgrid.css';
import './styles/media-queries.css';
import './styles/login.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
