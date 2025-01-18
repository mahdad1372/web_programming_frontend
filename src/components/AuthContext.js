import React, { createContext, useState, useEffect,useCallback  } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUserData = useCallback(async () => {
    const token = Cookies.get('jwt');
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const response = await axios.get('http://localhost:8005/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
      try {
        const addCartResponse = await axios.post(
          'http://localhost:8005/cart/addcart',
          { user_id: response.data.id }, // Include the user ID in the request body
          {
            headers: {
              Authorization: `Bearer ${token}`, // Pass the token in the headers
            },
          }
        );

        console.log('Cart created successfully:', addCartResponse.data);
      } catch (addCartError) {
        console.error('Error creating cart:', addCartError);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUser(null);
    }
  }, []);
  const logout = () => {
    Cookies.remove('jwt');
    setUser(null);
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <AuthContext.Provider value={{ user, fetchUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};