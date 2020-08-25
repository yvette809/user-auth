const express = require ("express");
const mongoose = require("mongoose");
const userRouter = require("./src/services/user")
const dotenv = require("dotenv");

const {
    notFoundHandler,
    forbiddenHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./src/errorHandler")

const server= express();
const cors = require ("cors");


dotenv.config();
server.use(express.json());
server.use(cors());

server.use("/user",userRouter)

server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(notFoundHandler)
server.use(genericErrorHandler)


const port = process.env.PORT || 3051

mongoose.connect("mongodb://localhost:27017/web_service",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
.then(
    server.listen(port, () =>{
        console.log(`something is runnning on port ${port}`)
    })
)
.catch(error => console.log(error)

)


