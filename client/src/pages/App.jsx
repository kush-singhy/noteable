import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './LoginPage';
import HomePage from './HomePage';
import AddBookPage from './AddBookPage';
import BookViewPage from './BookViewPage';
import EditBookPage from './EditBookPage';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = '/auth/login/success';
      const { data } = await axios.get(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="page">
      <Routes>
        <Route
          exact
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          exact
          path="/add"
          element={user ? <AddBookPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/book/:id"
          element={user ? <BookViewPage /> : <Navigate to="/login" />}
        />
        <Route
          exact
          path="/edit/:id"
          element={user ? <EditBookPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
