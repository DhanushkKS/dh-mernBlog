const express = require('express');
const router = express.Router()

const multer = require('multer');
const { createPost } = require('../controllers/blogPostsController');



const upload = multer({dest:'uploads/'})
/**create post */
router.post('/create-post',upload.single('cover'),createPost)
module.exports = router