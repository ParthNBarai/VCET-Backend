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
    }
   
});

module.exports = mongoose.model('user', UserSchema);