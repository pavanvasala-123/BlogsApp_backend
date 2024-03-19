const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author: {
        type : String,
        required:true
        
    },
    description:{
        type:String,
        required:true
    },
    user : {
            type : mongoose.Types.ObjectId,
            ref : "User"
    }
},{timestamps:true})

const Blog = mongoose.model("Blog",BlogsSchema)

module.exports = Blog;