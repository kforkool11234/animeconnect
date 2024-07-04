import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

function Header() {
  const [value, setValue] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    setLoggedIn(!!token);
  }, []); // Only run once on mount

  function logout() {
    localStorage.removeItem("jwtToken");
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
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h1>Anihit</h1>
          <Button href="/" variant="text" color="inherit" style={{ marginLeft: 10 }}>
            <HomeIcon /> Home
          </Button>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            style={{ width: 250 }}
            onChange={handleChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
          {loggedIn ? (
            <>
              <Button onClick={logout} variant="text" color="inherit">
                Logout
              </Button>
              <Button href="/wl" variant="text" color="inherit">
                Watchlist
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="text" color="inherit">
                Login
              </Button>
              <Button href="/signup" variant="text" color="inherit">
                Signup
              </Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
