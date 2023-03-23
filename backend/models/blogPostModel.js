const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
    },
    summary:{
        type:String
    },
    content :{
        type:String
    },
    cover:{
        type:String
    },
    user_id:{
        type : String,
        required :true
    }
},{timestamps:true})
module.exports = mongoose.model('Post',PostSchema)