import React from 'react';
import logo from '../assets/books.svg';

function LoginPage() {
  const googleAuth = () => {
    window.open('http://localhost:3000/auth/google/callback', '_self');
  };

  return (
    <div>
      <div className="">
        <img src={logo} className="" alt="Logo" />
        <div className="">noteable</div>
      </div>
      <div>
        <h2>Login</h2>
        <button onClick={googleAuth}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default LoginPage;
