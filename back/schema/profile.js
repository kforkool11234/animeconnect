import mongoose from "mongoose"
const profile= new mongoose.Schema({
    uname:{
        type:String,
        required:true,
    },
    watch:{
      type:String,
      required:true
    }
}) 
export default mongoose.model("profile",profile)
// {cpath === "/wl" ? 
//   <Button onClick={() => awl(props.mal_id, 'del')}>Delete</Button> 
//   : 
//   <Button onClick={() => awl(props.mal_id, 'add')}>Add to Watchlist</Button>
// }