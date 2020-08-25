const express = require ("express");
const dotenv = require("dotenv");
const server= express();
const cors = require ("cors")


dotenv.config();
server.use(express.json());
server.use(cors());

const port = process.env.PORT || 3051


server.listen(port, ()=>{
    console.log(`something is running on port ${port}`)
})