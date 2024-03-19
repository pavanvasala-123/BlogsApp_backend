const Blog = require('../Models/BlogsModel');
const User = require('../Models/UserModel')

const createBlog = async(req,res) => {
    const decodedUser = req.user 
    // console.log(decodedUser)

    // const {email} = decodedUser.email

    const {title, author , description} = req.body
    if(!title || !description || !author){
        res.status(400).json("Required All Fields")
    }

    const email = decodedUser.email

    try{

        const existingUser = await User.findOne({email})
        if(!existingUser){
            res.status(404).json("user not found")
        }
        const userId = existingUser._id;
        // console.log(existingUser)

        const blog = new Blog({title , description , user :userId, author})
        await blog.save()
        return res.json("Blog created")
    }catch(err){
       return  res.json("Internal server err" + err)
    }

    
}
const getUserBlogs = async(req,res) => {


    const decodeduser = req.user;
    const email = decodeduser.email;

    const existingUser = await User.findOne({email})
    if(!existingUser){
        res.status(404).json("user not found")
    }
    const userId = existingUser._id

    const userBlogs = await Blog.find({user:userId })
    if(!userBlogs){
        res.json("No blogs for user")
    }
    res.json(userBlogs)

}

const getAllBlogs = async(req,res) =>{ 
    try{
        const blogs = await Blog.find({});
        res.json(blogs)
    }catch(err){
        res.json("Internal server err" + err)
    }
   
}


const deleteBlog = async(req,res) => {
        const blogId = req.params.id 
        try{

            const blogs = await Blog.deleteOne({_id:`${blogId}`})
            res.json(blogs)

        }catch(err){
            res.json(err)
        }
}

module.exports = {createBlog , getAllBlogs , getUserBlogs ,deleteBlog}