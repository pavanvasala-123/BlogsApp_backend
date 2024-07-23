const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../Models/UserModel')

const getAllUsers = async(req,res) => {
    users = await User.find()
    res.json(users)
}

const signUp = async(req,res) => {
    const {name , email , password} = req.body;
    if(!name || !email || !password){
        res.json("Required All Fields")
    }

    const user = await User.findOne({email})

    if(user){
        return res.json("User Already Registred")
    }

    try{
    
    const salt = await bcrypt.genSalt(5)

    const HashedPassword = await bcrypt.hash(password,salt);

    const createUser = new User({name , email , password : HashedPassword})
    await createUser.save()
    res.status(201).json({createUser})
    }
    catch(err){
        res.status(500).json("Internal server Error")
    }

}

const login = async(req,res) =>{
    const {email,password} = req.body 
    try{

    if(!email ,!password){
        res.json("Required All Fields")
    }

    const existingUser = await User.findOne({email});
    if(!existingUser){
       return res.send("user not registred")
    }


    const PswrdMatch = await bcrypt.compare(password ,existingUser.password)

    if(PswrdMatch){ 

        const token = jwt.sign({ name: existingUser.name, email : existingUser.email }, process.env.secret_access_token, { expiresIn: '1h' })
        res.json(token)
    }
    else{
        res.json("invalid email or password ")
    }
   

    }
catch(err){
    res.json(err)
}
}

const getUser = async(req,res) => {

    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    return res.status(200).json({user})
   
}

const updateUser = async(req,res) => {
    
    const user = await User.findById(req.params.id)
    if(!user){
        req.json("User Data not found")
    }

    try{
        const {name , email} = req.body
        user.name = name;
        user.email = email;
        await user.save()
        return res.json(`User ${req.params.id} updated`)
    }catch(err){
        return res.json("Internal server error")
    }
}

const deleteUser = async(req,res) =>{
   
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            res.json("User account not found")
        }
        await User.deleteOne(user)
        return res.status(200).json("user removed")
    }catch(err){
        return res.status(500).json("Internal server error")
    }
}
module.exports = {getAllUsers,signUp,getUser ,deleteUser,updateUser ,login} 