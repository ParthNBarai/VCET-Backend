const express = require("express");
const app = express();
const port = process.env.PORT || 5000;


app.use(express.json());

//Database connnection
const ConnectionDB = require("./middleware/connection");
ConnectionDB();

// Routes for user : /api/v1/user/:
app.use("/api/v1/user", require('./routes/user'))


app.listen(port, () => console.log(`Server up and running...at ${port}`))