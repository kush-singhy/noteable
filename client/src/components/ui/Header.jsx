import { useNavigate } from 'react-router-dom';
import { useUser } from '../../pages/UserContext';
import PropTypes from 'prop-types';

import logo from '../../assets/books.svg';
import profile from '../../assets/profile.svg';

function Header({ button }) {
  const navigate = useNavigate();
  const user = useUser();

  const handleLogout = () => {
    window.open(`/auth/logout`, '_self');
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
          {button}
          <div className="dropdown">
            <button className="profile-btn" data-bs-toggle="dropdown">
              <img src={user.picture || profile} className="profile-img" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end profile-dropdown">
              <li className="profile-info">
                <img src={user.picture || profile} className="profile-img" />
                <div className="profile-text">
                  <span className="profile-name">{user.name || 'Guest'}</span>
                  <span>{user.email || ''}</span>
                </div>
              </li>
              <li>
                <hr className="profile-divider" />
              </li>
              <li>
                <button
                  className="logout-btn dropdown-item"
                  onClick={handleLogout}
                >
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
Header.propTypes = {
  button: PropTypes.node,
};

export default Header;
