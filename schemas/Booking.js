const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    source :{
        type: String,
        required:true
    },
    destination :{
        type: String,
        required:true
    },
    depaDate :{
        type: String,
        required:true
    },
    arriDate :{
        type: String,
        required:true
    },
    depaTime :{
        type: String,
        required:true
    },
    arriTime :{
        type: String,
        required:true
    },
    paymentId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
   
});

module.exports = mongoose.model('bookings', BookSchema);