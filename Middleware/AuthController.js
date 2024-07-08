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

// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//   const token = req.headers['authorization']?.split(' ')[1]; // Get the token from the Authorization header

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Failed to authenticate token' });
//     }

//     req.user = decoded; // Attach the decoded user to req.user
//     next();
//   });
// };

// module.exports = verifyToken;
