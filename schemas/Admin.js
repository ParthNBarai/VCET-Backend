const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    adminName: {
        type: String,
        default: "admin"
    }
});

module.exports = mongoose.model('admin', AdminSchema);