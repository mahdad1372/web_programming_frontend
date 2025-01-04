import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const token = Cookies.get('jwt'); // Retrieve the JWT token from cookies

      if (!token) {
        console.log('No token found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8005/users/me', {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Bearer token in the header
          },
        });

        setUser(response.data); // Update user state with response data
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

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
            <li><span>Welcome, {user.name || user.email}</span></li>
            <li><button onClick={() => Cookies.remove('jwt')}>Logout</button></li>
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