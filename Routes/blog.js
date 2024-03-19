const express = require('express');
const router = express.Router();
const {createBlog,getAllBlogs , getUserBlogs ,deleteBlog} = require('../Controllers/blog')
const verifyToken = require('../Middleware/AuthController')
const app = require('../server')

router.post('/createblog',verifyToken, createBlog).get("/", getAllBlogs).get('/user',verifyToken,getUserBlogs).delete('/:id' , deleteBlog)

module.exports = router;