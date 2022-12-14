const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    busNo:{
        type:String,
        required:true,
        unique:true
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
    paymentId: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    bookedSeatNo :{
        type : String,
    }
   
});

module.exports = mongoose.model('bookings', BookSchema);