const express = require("express");
const UserModel = require("./schema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require ("../middleware/auth")
const q2m = require("query-to-mongo")
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

// get users
userRouter.get("/", auth, async(req,res,next)=>{
    try{
        const query = q2m(req.query)
        const users = await UserModel.find(query.criteria, query.options.fields)
        .skip(query.options.skip)
        .limit(query.options.limit)
        .sort(query.options.sort)

        res.send({
            data:users,
            total:users.length
        })

    }catch(error){
        next(error)
    }
})

// user get its data
userRouter.get("/me",auth,async(req,res,next)=>{
    try{
        res.send(req.user)
    }catch(error){
        next("while reading list of users, a problem occured")
    }
})


// user edits it's data

userRouter.put("/me", auth, async(re,res,next)=>{
    try{
        const updates = object.keys(req.body)

    try{
        updates.forEach((update)=> req.user[update] = req.body[update])
        await req.user.save();
        res.send(req.user);

    }catch(error){
        res.status(400).send(error)
    }
    }catch(error){
        next(error)
    }
   
})

// user deletes itself
userRouter.delete("/me", auth, async(req,res,next)=>{
    try{
        await req.user.remove()
        res.send("deleted")
    }catch(error){
        next(error)
    }
})



module.exports= userRouter;