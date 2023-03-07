const Post = require('../models/blogPostModel')
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');
/**get all posts */
const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts)
}
/** get single post */
const getSinglePost = async (req, res) => {
    const { id } = rew.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such post,invalid post id' })
    }
    const post = await Post.findById(id)
    if (!post) {
        return res.status(404).json({ error: 'No post found' })
    }
    res.status(200).json(post)
}
/** createPost */
const createPost = async (req, res) => {
    const { title, summary, content } = req.body;
    
    try {
        //  res.status(200).json(post)
        const { originalname ,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath)
      
        const post = await Post.create({ title, summary, content, cover:newPath })
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message, msg: 'error happened in creating post in backend' })
    }
}



/** update post */
/** delete post */
module.exports = {
    createPost
}