import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post('http://localhost:8005/auth/login', {
        email, // Automatically uses email: email due to ES6 shorthand
        password,
      });

      // If successful, handle the response
      console.log('Login successful:', response.data);
      setMessage('Login successful!');
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 200
        console.error('Error response:', error.response.data);
        setMessage(`Login failed:The username and password is incorrect'`);
      } else if (error.request) {
        // Request was made, but no response received
        console.error('Error request:', error.request);
        setMessage('Login failed: No response from the server.');
      } else {
        // Other errors
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
        <div className='mt-3'>
        <button className='submit_button_style' type="submit">Login</button>
        </div>
        <div>Don't have an account?
           signup
        </div>
</div>
        </div>
        <div className='col-lg-6 custom-bg'>
         
        </div>
        </div>
      </div>
      {/* <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} */}
    </div>
  );
};

export default LoginPage;
