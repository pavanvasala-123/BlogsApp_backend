const express = require('express');
const router = express.Router();
const {createBlog,getAllBlogs , getUserBlogs ,deleteBlog,findBlogById,updateBlogById} = require('../Controllers/blog')
const verifyToken = require('../Middleware/AuthController')
const app = require('../server')

router.post('/createblog',verifyToken, createBlog).get("/", getAllBlogs).get('/user',verifyToken,getUserBlogs).delete('/:id' , deleteBlog)
router.get('/blog/:id',verifyToken, findBlogById);
router.put('/blog/:id',verifyToken, updateBlogById);

module.exports = router;