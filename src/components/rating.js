import axios from "axios";
const base_url = "https://api.jikan.moe/v4";
async function data(url) {
const res=await axios.get(base_url+url)
var tr=0
var tu=0
for (var i=0; i<(res.data.data.scores.length) ; i++) {
    tr+=(res.data.data.scores[i].score * res.data.data.scores[i].votes)
    tu+=res.data.data.scores[i].votes
}
const rate=(tr/tu)
return(String(rate).slice(0,4))
}
export default data