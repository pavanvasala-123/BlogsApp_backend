const jwt = require('jsonwebtoken');
require('dotenv').config()


const verifyToken = async(req,res,next) =>{
  const token = req.headers.Authorization || req.headers.authorization
  if(!token){
    return res.status(404).json("Access Denied")
  }
   const bearerToken = token.split(' ')[1]
   jwt.verify(bearerToken , process.env.secret_access_token , (err,decoded) => {
    
    if(err){
        res.send(err)
    }

    req.user = decoded;
    next()
    
  })


}

module.exports = verifyToken