const express = require('express');
const router = express.Router()

const multer = require('multer');
const { createPost, getAllPosts, getSinglePost } = require('../controllers/blogPostsController');


const temp = Math.random(100);
const upload = multer({dest:'uploads/'})
/**create post */
router.get('/',(req,res)=>res.json(temp))
router.post(`/create-post`,upload.single('cover'),createPost)

/**get All posts */
router.get('/posts',getAllPosts)
/** get single post */
router.get('/posts/:id',getSinglePost)
module.exports = router 