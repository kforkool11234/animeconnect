import React, { useState, useEffect } from "react";
import Card from "../components/card";
import HCard from "../components/hcard";
import axios from "axios";
import { Tooltip } from "@mui/material";

function Wl() {
  const [animelist, setAnimeList] = useState([]);
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get("/wl", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnimeList(response.data); // Assuming response.data is an array of anime IDs
      } catch (error) {
        console.error("Error fetching anime list:", error);
      }
    };

    fetchAnimeList();
  }, []);

  useEffect(() => {
    const fetchAnimeInfo = async () => {
      try {
        const promises = animelist.map(async (animeId) => {
          const response = await axios.get(
            `https://api.jikan.moe/v4/anime/${animeId.watch}`
          );
          return response.data;
        });
        const animeInfo = await Promise.all(promises);
        setInfo(animeInfo);
      } catch (error) {
        console.error("Error fetching anime info:", error);
      }
    };

    if (animelist.length > 0) {
      fetchAnimeInfo();
    }
  }, [animelist]);

  if (info.length > 0) {
    console.log(info)
    return (
      <div className='container'>
        {info.map(anime => (<a  href={`/anime/${anime.data.mal_id}`} className='tile' ><Tooltip title={<HCard name={anime.data.title_english} mal_id={anime.data.mal_id} />} placement='bottom-end'>
        <Card name={anime.data.title_english} img={anime.data.images.jpg.image_url} mal_id={anime.data.mal_id}/> </Tooltip></a>
          
          
        ))}
      </div>
    );
  }
  else{
    return(<div className='load-con'><p className='load'></p></div>)
  }
}

export default Wl;
// data.