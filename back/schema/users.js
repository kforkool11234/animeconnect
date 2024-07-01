import mongoose from "mongoose"
const lschema= new mongoose.Schema({
    uname:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    }
}) 
export default mongoose.model("user",lschema)