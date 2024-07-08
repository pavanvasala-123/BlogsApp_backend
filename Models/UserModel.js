const mongoose = require('mongoose');

const UserSchema  = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email : {
        type:String,
        required:true 
    },
    password : {
        type:String,
        required :true
    },
    blogs : [{ type : mongoose.Types.ObjectId , ref : "Blog" , required:true}]
    
})
const User = mongoose.model("User" , UserSchema)

module.exports = User;