const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const validator = require('validator');
const Schema = mongoose.Schema
  const userSchema =new  Schema({
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required : true
    }
})

//static signup method
userSchema.statics.signup = async function(email,password){
  
    if(!email||!password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    // if(!validator.isStrongPassword(password)&& 1==1){
    //     throw Error('Password not Strong enough');
    // }
    const exists = await this.findOne({email})
    if(exists){
        throw Error('email alrady in use')
    }

    const salt= await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash}) 
    return user
}
//user login
userSchema.statics.login = async function(email,password){
    if(!email||!password){
        throw Error('All fields must be filled')
    }//මේකෙ බලනව ලොග් වෙන කෙනා ඊමේල් පාස්වර්ඩ් හරිය්ට ෆිල් කරලද කියලා
    const user = await this.findOne({email})//ඒක හරිනම් ඊට පස්සෙ බලනව අදාල ඊමේල් එකට ඌස කෙනෙක් ඉන්නවද කියල
    if(!user){
        throw Error("User not exiats")
    }// එහෙම කෙනෙක් නැත්තම් මේක රිටන් කරනව
    const match = await bcrypt.compare(password,user.password)// ඒ ඔක්කොම හරිනම් යූසර් එන්ට කරපු පාස්වර්ඩ් එක අදාල පාස්වර්ඩ් එකට මැච් වෙනවද කියල බලනවා.
    if(!match){
        throw Error('incorrect password');
    }// වැරදිනම් මේ එරර් එක ත්‍රෝ කරනවා
    return user;// ඒ ඔක්කොම හරිනම් යූසර්ව රිටන් කරනවා.
}



module.exports=mongoose.model('User',userSchema)