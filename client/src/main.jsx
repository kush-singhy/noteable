import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/library',
    element: <HomePage />,
  },
  {
    path: '/add',
    element: <AddBookPage />,
  },
  {
    path: '/book/:id',
    element: <BookViewPage />,
  },
  {
    path: '/edit/:id',
    element: <EditBookPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="943703580105-5obethg8np59k6fq7jqdhef59ahveae7.apps.googleusercontent.com">
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>
);
