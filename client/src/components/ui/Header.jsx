import React, { useState } from 'react';
import logo from '../../assets/books.svg';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const [isDropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    window.open(`/auth/logout`, '_self');
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
          <div className="dropdown">
            <button className="profile-btn" data-bs-toggle="dropdown">
              <img src={profile} className="profile-img" />
            </button>
            <ul class="profile-dropdown dropdown-menu">
              <li>
                <button class="logout-btn dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
