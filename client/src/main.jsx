import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './pages/App.jsx';
import HomePage from './pages/HomePage.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import BookViewPage from './pages/BookViewPage.jsx';
import EditBookPage from './pages/EditBookPage.jsx';

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
