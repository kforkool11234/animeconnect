import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', { username, password });
      console.log(response.data);
      if (response.status === 200) {
        localStorage.setItem('jwtToken', response.data.token); // Store the token
        navigate('/'); // Navigate to home page
        window.location.reload(); // Reload to update header
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.response.data.message);
      } else {
        console.error('Error logging in:', err);
      }
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
