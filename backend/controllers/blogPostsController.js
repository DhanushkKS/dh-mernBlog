const Post = require('../models/blogPostModel')
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');


/**get all posts 
 * endpoint : 'api/blog-post/posts
*/
const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).sort({ createdAt: -1 })
    res.status(200).json(posts) 
   console.log(req.user._id);
}

/** get single post 
 * Endpoint : api/blog-post/posts/:id
*/
const getSinglePost = async (req, res) => {
    const { id } = req.params;
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
    const user_id = req.user._id;
    try {
        //  res.status(200).json(post)
        const { originalname ,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath)
      
        
        const post = await Post.create({ title, summary, content, cover:newPath,user_id })
        res.json(post);
    } catch (error) {
        res.status(400).json({ error: error.message, msg: 'error happened in creating post in backend' })
    }
}




/** update post */
const updatePost = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such post'})
        
    }
    try {
        const {title,summary,content} = req.body
        const { originalname ,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1]
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath)
        const post = await Post.findByIdAndUpdate({_id:id},{...req.body,cover:newPath})
         if(!post){
        return res.status(404).json({error:'No such post'})

    }
    res.status(200).json(post)
    } catch (error) {
        
    }
    
       
   
}
const deletePost =async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'no such post,invalid post id' })
    }
   const post =  await Post.findByIdAndDelete({_id:id})
    if(!post){
        return res.status(400).json({error:'No such post'})
    }
    res.status(200).json({msg:`deleted post ${id}`})

}



/** delete post */
module.exports = {
    createPost,
    getAllPosts,
    getSinglePost,
    updatePost,
    deletePost


}