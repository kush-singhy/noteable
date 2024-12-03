import logo from '../../assets/books.svg';
import profile from '../../assets/profile.svg';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header({ button }) {
  const navigate = useNavigate();

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
              <img src={profile} className="profile-img" />
            </button>
            <ul className="profile-dropdown dropdown-menu">
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
