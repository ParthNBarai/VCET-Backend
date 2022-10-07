const mongoose = require("mongoose");

const BusRoutes = mongoose.Schema({

    city: {
        required: true,
        type: String,

    },
    data: [{

        route: {
            type: String,
            required: true
        },
        busNumber: {
            type: String,
            required: true
        }
    }],

});

module.exports = mongoose.model('routes', BusRoutes);