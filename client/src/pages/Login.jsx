import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import Header from '../components/ui/Header';
import Home from '../components/Home';

function Login() {
  const googleAuth = () => {
    window.open('http://localhost:3000/auth/google/callback', '_self');
  };

  return (
    <div className="page">
      <h2>noteable</h2>
      <div>
        <h2>Login</h2>
        <button onClick={googleAuth}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default Login;
