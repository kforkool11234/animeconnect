import React,{useState} from "react"
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import {  useNavigate } from 'react-router-dom';


function Header(){
    const [value,setvalue]=useState()
    const navigate = useNavigate()
    function set(event){
        setvalue(event.target.value)
    }

    function send(){
        navigate('/search',{state:{data:value}})
    }
    return(<div>
        <h1>Anime Recommendation</h1>
        <div>
        <TextField style={{ width:550}} onChange={set} onKeyDown={e=>{
                        if(e.key==='Enter'){
                            send()
                        }
                    }}
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton type="submit" aria-label="send" onClick={send} >
                        <SendIcon />
                    </IconButton>
                </InputAdornment>
            ),
        }}/>
        <Button href='/' variant="search"  style={{color:"black", backgroundColor:"beige"}  }><HomeIcon/></Button>
        </div>
    </div>)
}
export default Header
