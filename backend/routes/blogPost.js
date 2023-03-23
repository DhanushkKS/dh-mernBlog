const express = require('express');
const router = express.Router()

const multer = require('multer');
const { 
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost
 } = require('../controllers/blogPostsController');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth)
const temp = Math.random(100);
const upload = multer({ dest: 'uploads/' })

/**create post */
// router.get('/', (req, res) => res.json(temp))
router.post(`/create-post`, upload.single('cover'), createPost)

/**get All posts */
router.get('/posts', getAllPosts)
/** get single post */
router.get('/posts/:id', getSinglePost)

/**Update post */
router.patch('/posts/:id',upload.single('cover'), updatePost)

/**delete post */
router.delete('/posts/:id', deletePost)

module.exports = router 