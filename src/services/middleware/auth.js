const jwt = require ("jsonwebtoken");
const config= require ("../../config/index.json");


module.exports = function (req,res,next){
    const token =  req.header("x-auth-token");
    if(!token){
        return res.status(401).json({msg:"No token, authorisation denied"})
    }else{
        // if there is a token, let' verify it
        try{
            const decoded = jwt.verify(token, config.get('jwtSecret'));
            // from the decoded object, i take the user 
            req.user = decoded.user;
            next()
        }catch(err){
            res.status(401).json({msg:"Token is not valid"})
        }
       
    }
}