// data.js
import axios from "axios";
const base_url = "https://api.jikan.moe/v4";

async function data(url) {
  try {
    const response = await axios.get(base_url + url);
    const anilist = [];
    if(url==="/recommendations/anime"){
      for (let i = 0; i < response.data.data.length; i++) {
        for (let j = 0; j < 2; j++) {
          const ani = {
            name: response.data.data[i].entry[j].title,
            img: response.data.data[i].entry[j].images.jpg.image_url,
            mal_id:response.data.data[i].entry[j].mal_id
          };
          anilist.push(ani);
        }
      }
    }
    else if(url.includes("/anime?q")){
      console.log()
      for (let i = 0; i < response.data.data.length; i++) {
        const ani = {
          name: response.data.data[i].title,
          img: response.data.data[i].images.jpg.image_url,
          mal_id:response.data.data[i].mal_id
        };
        anilist.push(ani)
      }
    }
    return anilist;
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
export default data;
