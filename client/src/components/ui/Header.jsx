import React from 'react';
import logo from '../../assets/books.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

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
        </div>
      </div>
    </div>
  );
}

export default Header;
