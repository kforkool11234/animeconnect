import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Data from "./rating";
import Button from '@mui/material/Button';

function Hcard(props) {
  const [r, setR] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    setLoggedIn(!!token);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Data(`/anime/${props.mal_id}`);
        setR(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      setR(null);
    };
  }, [props.mal_id]);
  const cpath=window.location.pathname
  const awl = async (id,action) => {
    const token = localStorage.getItem('jwtToken');
    try {
     const  res= await axios.post('/addwl', { id, action }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(res.data.message);
      window.location.reload()
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }}>
          {props.name}
        </Typography>
        <Typography>{r}</Typography>
        {loggedIn ? (
          cpath === "/wl" ? (
            <Button onClick={() => awl(props.mal_id, 'del')}>Delete</Button>
          ) : (
            <Button onClick={() => awl(props.mal_id, 'add')}>Add to Watchlist</Button>
          )
        ) : (
          <Typography>Login to add to watchlist</Typography>
        )}
        
      </CardContent>
    </Card>
  );
}

export default Hcard;
