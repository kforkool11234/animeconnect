import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import info from '../components/info';
import './anime.css';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import HCard from '../components/hcard';
import Card from '../components/card';

function Anime() {
  const { malid } = useParams();
  const [data, setData] = useState({});
  const [recc, setRecc] = useState([]);

  useEffect(() => {
    info(`/anime/${malid}/full`).then(data => {
      setData(data);
    });
  }, [malid]);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${malid}/recommendations`).then(res => {
      setRecc(res.data.data);
    });
  }, [malid]);

  if (Object.keys(data).length > 0) {
    return (
        <div>
            <div className="anime-container">
        <div className="anime-image">
          <img src={data.img} alt={data.title} />
        </div>
        <div className="anime-summary">
          <h1>{data.title}</h1>
          <h2>{data.name}</h2>
          <h3>{data.cat.length > 0 ? data.cat[0].name : data.age}</h3>
          <p>{data.info || "no info available"}</p>
          <p>
            Watch on:{" "}
            {data.watch.map(watchData => (
              <a href={watchData.url} key={watchData.name} className="watch-link">
                {watchData.name}
              </a>
            ))}
          </p>
          {data.vid == null ? (
            <p>trailer not available</p>
          ) : (
            <iframe title="trailer" src={data.vid} />
          )}
        </div>
      </div>
      <h3>More like this</h3>
      <div className="small-cont">
          
          {recc.map(anime => (
            <Tooltip key={anime.entry.mal_id} title={<HCard name={anime.entry.title} mal_id={anime.entry.mal_id} />} placement="bottom-end">
              <a href={`/anime/${anime.entry.mal_id}`} className="tile">
                <Card name={anime.entry.title} img={anime.entry.images.jpg.image_url} mal_id={anime.entry.mal_id} />
              </a>
            </Tooltip>
          ))}
        </div>
        </div>
      
    );
  } else {
    return <div className="load-con"><p className="load"></p></div>;
  }
}

export default Anime;
