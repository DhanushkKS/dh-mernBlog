//login user register user
/**
 * 1) user wa import kara ganna
 * 2) jwt ganna token eka hadanna ona nsa and token eka hadanna
 * (3) loginuser register user function hadanna //meka request,responce ekak
 * (3.1) request eken email,password ganna
 * (3.2) try karanna,
 *  user kenekwa ganna login function ekata call karanna
 * token eka hadanna // createtoken
 * responce eka yawanna email ekai token ekai
 * nattam catch karanna error ekak yawanna
 */
const User = require('../models/userModel')
const jwt = require('jsonwebtoken');
const createToken=(_id)=>{
    return jwt.sign({_id:_id},process.env.SECRET,{expiresIn:'3d'})
}
/**Login User */
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token,msg:"login success"})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
    /**Register user */
}
const registerUser = async (req, res) => {
    const { email, password ,confirmPassword} = req.body
    try {
        if(password===confirmPassword){
            const user = await User.register(email, password)
        const token = createToken(user._id)
        res.status(200).json({email, token})
        }else{
            throw Error("passwords doesn't maxtch")
        }
        
    } catch (error) {
        res.status(400).json({ error:' registerUser '+ error.message })
    }
}
module.exports = {
    loginUser,
    registerUser

}