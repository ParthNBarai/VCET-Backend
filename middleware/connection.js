const mongoose = require("mongoose");
require("dotenv/config")

//Connectiin of database 
const ConnectionDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URL, () => {
            console.log("Connected to Database sucessfully")
        })
    } catch (error) {
        console.log(error)
        exit(0);
    }
}

module.exports = ConnectionDB;
