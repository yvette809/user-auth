const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required:[true, 'username is required'],
        unique: true
    },

    password:{
        type: String,
        required:[true, 'password is required']
    },
    firstName:{
        type: String,
        required:[true, 'firstname is required']
    },
    lastName:{
        type:String,
        required:[true, 'lastname is required']
    },

    role: {
        type: String,
        enum: ["admin", "user"],
       
      }
})


const UserModel = mongoose.connect("user", userSchema);
module.exports = UserModel;