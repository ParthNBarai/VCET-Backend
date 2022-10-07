const mongoose = require("mongoose");

const BusSchema = mongoose.Schema({

    city: {
        required: true,
        type: String,

    },
    data: [{
        
        stopName: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
    }],
});

module.exports = mongoose.model('plans', BusSchema);