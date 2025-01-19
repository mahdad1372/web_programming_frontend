import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Registerpage = () => {
  const [email, setEmail] = useState('');
  const [fullName, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [role, setrole] = useState('customer');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    try {
      const response = await axios.post('http://localhost:8005/users/adduser', {
        fullName,
        email,
        password,
        role
      });

      if (response.status === 200) {
        // If successful, handle the response and redirect
        console.log('Login successful:', response.data);
        setMessage('Signup successful!');

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
  <h2>Sign up page</h2>
  </div>
  <div>Please enter your detail</div>
  <div className='mt-3'>
  <div>
          <label>Fullname:</label>
        </div>
  </div>
  <div>
  <div>
  <input
            className='input_size'
            type="Fullname"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>
  </div>


  <div className='mt-3'>
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
        <button className='submit_button_style' type="submit">Submit</button>
        </div>
        {/* <div>Don't have an account?
           signup
        </div> */}
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

export default Registerpage;