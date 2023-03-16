/** මේකෙන් බලන්නෙ user එවන රෙක්වස්ට් එක ඕතරයිස්ඩ් ද නැද්ද කියලා බලන එක. 
 * මේක මිඩ්ල්වෙයා එකක්
 * ඕතරයිස් කරන්න ඕන තැනින් පෝස්ට් රිකස්ට් එකත් එක්ක ලොග් වෙලා ඉන්න යූසර්ගෙ ටෝකන් එක එවනවා.
 * ඒක ගන්න req.headers walin
 * token ekak nattam 401 json ekak yawanna
 * nettam jwt token eka ganna token kiyala variable ekak hadala, gattta header eka split karala
 *  ### frontend eken ena header eka :-'Authorization':   `Bearer ${user.token}`
 * oya token eka verify karala _id eka gana , //jwt.verify(token,secret)
 * oya gatta id ekt adalawa userwa ganna User.findone({_id}).select('id) //oya thm lokuwt mongo danna meka select krana hati hithnn epa eka passe balamu
 * ilagata next() call karanna,, 
 * 
 * ##### meken wenne otharize nam witharai meka call karana thana idan yata route access karanna denne.
 * 
 */
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth = async(req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:'Authorization required'})

    }

    const token = authorization.split(' ')[1]
    try {
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log("error happened in requireAuth Middleware",error);
    res.status(401).json({error:"Request is not Authorized"})
    }
    
}
module.exports = requireAuth;