import React, { useState, useEffect,useContext } from 'react';
import { Link ,useLocation } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';
const Navbar = () => {
  const { user, logout,fetchUserData  } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    // Fetch user data on every route change
    fetchUserData();
  }, [location, fetchUserData]); // Re-run when location changes
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

console.log(user)
  return (
    <nav className="navbar">
      <div className="logo">Brand</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a><Link to="/">Home</Link></a></li>
        {user ? (
          <>
            <li><span>{user.fullName}</span></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        <li><a>Services</a></li>
        <li><a>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;