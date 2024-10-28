import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './components/App.jsx'
import AddBook from './components/AddBook.jsx';
import './index.css'
import './styles/styles.css'
import './styles/header.css'
import './styles/filters.css'
import './styles/bookgrid.css'
import './styles/media-queries.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <AddBook />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
