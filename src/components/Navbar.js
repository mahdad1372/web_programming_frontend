import React, { useState } from 'react';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Brand</div>
      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? '✖' : '☰'}
      </div>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><a>Home</a></li>
        <li><a>
        <Link to="/login">Login</Link>
          </a></li>
        <li><a>Services</a></li>
        <li><a>Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;