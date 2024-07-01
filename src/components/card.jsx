 import react from 'react';
 import { useNavigate } from 'react-router-dom';
 function Card(props) {
    const navigate=useNavigate()
    function click(){
      navigate(`/anime`,{state:{id: props.mal_id,name:props.name,img:props.img}})
    }
    return(<div className='tile' onClick={click}>
    <h2>{props.name.length>15 ? props.name.slice(0,15)+'...' : props.name}</h2>
    <img src={props.img} alt={props.name} />
  </div>)
 }
 export default Card;