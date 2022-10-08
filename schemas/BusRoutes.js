const mongoose = require("mongoose");

const BusRoutes = mongoose.Schema({
    busNo: {
        type: String,
        required: true,
        unique: true
    },
    travelsName: {
        type: String,
        default: "user"
    },
    source: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true
    },
    sourceCoordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
    },
    destCoordinates: {
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
    },
    stopsCoordinates: [{
        latitude: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
    }]
});

module.exports = mongoose.model('routes', BusRoutes);