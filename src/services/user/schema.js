const mongoose = require("mongoose");
const Schema = new Schema;

const UserSchema = new Schema({
    username: {
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
        required: true,
      }
})


const UserModel = mongoose.connect("user", UserSchema);
module.exports = UserModel;