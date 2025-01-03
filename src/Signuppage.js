import React, { useState } from 'react';
import axios from 'axios';

const SignUpPage = () => {
  const [fullName, setfullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post('http://localhost:8005/auth/signup', {
        fullName,
        email, // Automatically uses email: email due to ES6 shorthand
        password,
      });

      // If successful, handle the response
      console.log('Signup successful:', response.data);
      setMessage('Signup successful!');
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 200
        console.error('Error response:', error.response.data);
        setMessage(`Signup failed:the email or name duplicated`);
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
      <h1>Signup</h1>
      <form onSubmit={handleLogin}>
      <div>
          <label>Fullname:</label>
          <input
            type="fullname"
            value={fullName}
            onChange={(e) => setfullName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">SignUp</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpPage;
