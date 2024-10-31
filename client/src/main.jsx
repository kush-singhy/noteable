import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './pages/App.jsx';
import AddBookPage from './pages/AddBookPage.jsx';
import BookViewPage from './pages/BookViewPage.jsx';
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
    path: '/add',
    element: <AddBookPage />,
  },
  {
    path: '/book/:id',
    element: <BookViewPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
