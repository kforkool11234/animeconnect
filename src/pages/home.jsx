// Home.jsx
import React, { useEffect, useState } from 'react';
import fetchData from '../components/data';
import Tooltip from '@mui/material/Tooltip';
import HCard from '../components/hcard'
import Card from '../components/card';

function Home() {
  const [animeList, setAnimeList] = useState([]);
  
  useEffect(() => {
    fetchData("/recommendations/anime").then(data => {
      setAnimeList(data); // Set the state with the fetched data
    });
  }, []); // The empty array ensures this effect runs only once when the component mounts

  // Return statement added here
  if (animeList.length > 0) {
    return (
      <div className='container'>
        {animeList.map(anime => (<a  className='tile'><Tooltip title={<HCard name={anime.name} mal_id={anime.mal_id} />} placement='bottom-end'>
        <Card name={anime.name} img={anime.img} mal_id={anime.mal_id}/> </Tooltip></a>
          
          
        ))}
      </div>
    );
  }
  else{
    return(<div className='load-con'><p className='load'></p></div>)
  }
}

export default Home;
