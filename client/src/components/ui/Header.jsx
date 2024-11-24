import React from 'react';
import logo from '../../assets/books.svg';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.open(`http://localhost:3000/auth/logout`, '_self');
  };
  const handleAddBook = () => {
    navigate('/add');
  };
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header-content">
        <div className="logo-box">
          <img onClick={handleGoHome} src={logo} className="logo" alt="Logo" />
          <div onClick={handleGoHome} className="title">
            noteable
          </div>
        </div>
        <div className="add-book">
          <button onClick={handleAddBook} className="add-book-btn">
            Add Book
          </button>
          <button onClick={handleLogout} className="profile-btn">
            <img src={profile} className="profile-img" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
