import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

import Header from '../components/ui/Header';
import Home from '../components/Home';

function App() {
  const successMessage = (reponse) => {
    console.log('Success! ', reponse);
  };

  const errorMessage = (error) => {
    console.log('Error ', error);
  };

  return (
    <div className="page">
      <Header />
      <div>
        <h2>Login</h2>
        <GoogleLogin onSuccess={successMessage} onError={errorMessage} />
      </div>
    </div>
  );
}

export default App;
