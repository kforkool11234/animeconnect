import axios from "axios";
const base_url = "https://api.jikan.moe/v4";
async function data(url) {
const res=await axios.get(base_url+url)
return(res.data.data.score)
}
export default data