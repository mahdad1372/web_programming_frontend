import React, { useState ,useContext} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import {AuthContext} from './components/AuthContext';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { fetchUserData } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post('http://localhost:8005/auth/login', {
        email,
        password,
      });

      if (response.status === 200) {
        
        const token = response.data.token; // Assuming the JWT is returned as 'token'
        Cookies.set('jwt', token, { expires: 7, path: '/', secure: true });
        // Save the token in a cookie
        document.cookie = `jwt=${token}; path=/; secure; HttpOnly`;
        // If successful, handle the response and redirect
        console.log('Login successful:', response.data);
        setMessage('Login successful!');
        navigate('/'); // Redirect to the "/" route
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        setMessage('Login failed: The username and password is incorrect.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        setMessage('Login failed: No response from the server.');
      } else {
        console.error('Error:', error.message);
        setMessage('Login failed: The Email or password is incorrect.');
      }
    }
  };

  return (
    <div>
       <div className='container-fluid'>
        <div className='row'>
        <div className='col-lg-6'>
          <form onSubmit={handleLogin}>
        <div class="d-flex flex-column login_column">
  <div>
  <h2>Login page</h2>
  </div>
  <div>Please enter your detail</div>
  <div>
  <div>
          <label>Email:</label>
        </div>
  </div>
  <div>
  <div>
  <input
            className='input_size'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
  </div>
  <div className='mt-3'>
  <div>
          <label>Password:</label>
        </div>
  </div>
  <div>
  <input
            className='input_size'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
        {message}
          </div>
        
        <div className='mt-3'>
        <button className='submit_button_style' type="submit">Login</button>
        </div>
        <div>Don't have an account?
          <Link to="/signup">signup</Link>
          
        </div>
</div>
</form>
        </div>
        <div className='col-lg-6 custom-bg'>
         
        </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
