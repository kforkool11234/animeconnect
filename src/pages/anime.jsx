import react,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import info from '../components/info';
function Anime(){
    const[data,setdata]=useState({})
    const location=useLocation()
    useEffect(()=>{info(`/anime/${location.state.id}/full`).then(data=>{setdata(data)});return()=>{}},[location.state.id])
    console.log(data)
    if(Object.keys(data).length>0){
        return(<div>
            <div>
            <h1>{data.title}</h1>
            <h2>{data.name}</h2>
                <img src={data.img} alt={data.title}/>
            </div>
            <p>{data.cat.length>0 ?  data.cat[0].name : data.age}</p>
            <p>{data.info || "no info available "}</p>
            <p>Watch on: {data.watch.map(data=>{return(<a href={data.url}>{data.name} </a>)})}  </p>
            
            {data.vid==null ? <p>trailer not available</p> :<iframe title='trailer' src={data.vid}/>}
        </div>)
    }
    else{
        return(<div className='load-con'><p className='load'></p></div>)
    }
}   
export default Anime