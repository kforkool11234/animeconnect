import React, { useState, useEffect } from "react";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [value, setValue] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setLoggedIn(!!token);
  }, []); // Only run once on mount

  function logout() {
    localStorage.removeItem('jwtToken');
    setLoggedIn(false);
    navigate("/");
  }

  function handleChange(event) {
    setValue(event.target.value);
  }

  function send() {
    navigate(`/search/${value}`, { state: { data: value } });
  }

  return (
    <div>
      <h1>Anime Recommendation</h1>
      <div>
        <TextField
          style={{ width: 550 }}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              send();
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="send" onClick={send}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button href='/' variant="search" style={{ color: "black", backgroundColor: "beige" }}>
          <HomeIcon />
        </Button>
        {loggedIn ? (
            <>
            <Button onClick={logout}  variant="contained" style={{marginLeft: 20}}>Logout</Button>
            <Button href="/wl"  variant="contained" style={{marginLeft: 20}}>watchlist</Button>
          </>
          
        ) : (
          <>
            <Button href='/login' variant="contained" style={{marginLeft: 20}}>Login</Button>
            <Button href='/signup'  variant="contained" style={{marginLeft: 20}}>Signup</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
