const express = require('express');
const router = express.Router();
const {getAllUsers,signUp,getUser,deleteUser,updateUser,login} = require('../Controllers/user')
const verifyToken = require('../Middleware/AuthController')

router.get('/getAllUsers',verifyToken , getAllUsers).post('/signUp', signUp).get('/:id' , getUser).delete("/:id" , deleteUser).put('/:id',updateUser).post('/login' , login)

module.exports = router