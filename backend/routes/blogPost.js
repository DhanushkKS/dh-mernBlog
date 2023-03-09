const express = require('express');
const router = express.Router()

const multer = require('multer');
const { createPost } = require('../controllers/blogPostsController');


const temp = Math.random(100);
const upload = multer({dest:'uploads/'})
/**create post */
router.get('/',(req,res)=>res.json(temp))
router.post(`/create-post`,upload.single('cover'),createPost)
module.exports = router 