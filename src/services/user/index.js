const express = require("express");
const UserModel = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const userRouter = express.Router();
const config = require ("../../config/production.json");



// register a user


userRouter.post("/", async(req,res,next)=>{
    const {firstName, lastName,userName, password} = req.body;
    try{
        let user = await UserModel.findOne({userName})
        if(user){
            const error = new Error("user already exist");
            error.httpStatusCode = 404;
            next(error)
        }else{
            user = new UserModel({
                firstName,
                lastName,
                userName,
                password
            })

            // encrypt password before saving use in the database
            const salt  = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password,salt)
            await user.save();

            // send a payload to the user when registring(jsonwebtoken). It takes 4 parameters
            const payload = {
                user:{
                    id:user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), {expiresIn:360000}, (err,token)=>{
                if(err){
                    throw err
                }else{
                    res.json({token})
                }

            } )
        }


    }catch(error){
        next (error)
    }
    
})




module.exports= userRouter;