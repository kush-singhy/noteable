import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import Header from '../components/ui/Header';
import HomePage from './HomePage';
import Login from './Login';
import { Routes, Route, Navigate } from 'react-router-dom';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = 'http://localhost:3000/auth/login/success';
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
          element={user ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;
