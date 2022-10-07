const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        default: "user"
    },
    device_id: {
        type: String,
        required: true
    },
    
    user_id: {
        type: String,
        required: true
    },
    longitude:{
        type:String,
        required: true,
        default:"72.9717329"
    },
    latitude:{
        type:String,
        required: true,
        default: "19.1876776"
    },
   
});

module.exports = mongoose.model('user', UserSchema);