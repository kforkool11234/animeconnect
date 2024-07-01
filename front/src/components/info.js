import axios from 'axios'
const base_url = "https://api.jikan.moe/v4";
async function info(url){
    var data={}
    const res= await axios.get(base_url+url)
    //image embeded trailer episode status rank synopsis demographics(name) relation(sequel,name,url) streaming external charecter staff
    console.log(res.data.data)
    data={img:res.data.data.images.jpg.large_image_url, name:res.data.data.title,title:res.data.data.title_english,day:res.data.data.broadcast.day, time:res.data.data.broadcast.time,cat:res.data.data.demographics,genre:res.data.data.genres,rank:res.data.data.rank,age:res.data.data.rating,status:res.data.data.status,watch:res.data.data.streaming,info:res.data.data.synopsis,vid:res.data.data.trailer.embed_url}
    console.log(data)
    return(data)
}
export default info