import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const navigate= useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(username,password,email)
      const response= await axios.post('/signup', { username, email, password });
      alert(response.data.message)
      navigate('/login')
    } catch (error) {
      console.error('Error signup:', error);

    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required onChange={(e) => setemail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" name="confirm-password" required />
        </div>
        <button type="submit" className="login-button">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
