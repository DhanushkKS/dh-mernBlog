require('dotenv').config()
const express = require('express');
const cors = require('cors')
const userRoutes = require('./routes/user');
const blogPostRoutes = require('./routes/blogPost');
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);
mongoose.connect(process.env.DB_URI)
.then(result=>{
    app.listen(process.env.PORT, ()=>{
        console.log('listening on port '+ process.env.PORT);
        
    })
    
 })
 .catch(err=>{console.log(err);});



//express app
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.use('/uploads',express.static(__dirname+'/uploads'));

app.use((req,res,next)=>{
    console.log(req.path,req.method);
    next()
})
app.use('/api/user',userRoutes)
app.use('/api/blog-post',blogPostRoutes)


