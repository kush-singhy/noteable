import React from 'react';
import logo from '../assets/books.svg';
import googleLogo from '../assets/google-icon-logo.svg';

function LoginPage() {
  const googleAuth = () => {
    window.open('/auth/google/callback', '_self');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-logo-box">
          <img src={logo} className="login-logo" alt="Logo" />
          <div className="login-title">noteable</div>
        </div>
        <div className="login-description">
          <p>Create a beautiful digital library.</p>
        </div>
        <hr className="login-divider" />
        <div className="login-btn-box">
          <button onClick={googleAuth} className="login-btn">
            <img src={googleLogo} className="google-logo" alt="Google Logo" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
