import React ,{ useEffect, useState }from 'react';
import fetchData from '../components/data'
import Tooltip from '@mui/material/Tooltip';
import HCard from '../components/hcard'
import Card from '../components/card'
import {useParams} from "react-router-dom";

function Search(){

    const {malid}=useParams();
    const [animeList, setAnimeList] = useState([]);
    useEffect(() => {
      fetchData(`/anime?q=${malid}&sfw`).then(data => {
        setAnimeList(data); // Set the state with the fetched data
      });
      return()=>{setAnimeList([])}
    }, [malid]);
    if (animeList.length > 0) {
      return (
        <div className="container">
          {animeList.map(anime => (
            <Tooltip key={anime.mal_id} title={<HCard name={anime.name} mal_id={anime.mal_id} />} placement="bottom-end">
              <a href={`/anime/${anime.mal_id}`} className="tile">
                <Card name={anime.name} img={anime.img} mal_id={anime.mal_id} />
              </a>
            </Tooltip>
          ))}
        </div>
      );
    } else {
      return (
        <div className="load-con">
          <div className="load"></div>
        </div>
      );
    }
    
}
export default Search