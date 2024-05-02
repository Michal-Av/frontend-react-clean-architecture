// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo/3.png';
import './Header.css'
import {logout} from '../../../services/api-auth'
const Header = ({ username }) => {

  const handleLogout = async (props) => {
    try {
      await logout();
      console.log('User has logged out');
      props.history.push("/login");
    } catch (error) {
      console.log('User has not logged out');
    }
  };

  return (
    <nav>
      <div className="logo">
        {/* Assuming you have a logo image located at 'path/to/logo.png' */}
        <img src={Logo} alt="Logo" />
      </div>
      <div className="user-info">
        <span>Welcome {sessionStorage["username"]}</span>
      </div>
      <ul className="nav-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><a href="/" onClick={handleLogout}>Logout</a></li>
        {/* Add more navigation links as needed */}
      </ul>
    </nav>
  );
};

export default Header;
