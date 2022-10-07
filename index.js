const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const BusSchema = require('./schemas/BusStops')
const dataSet = require('./routes/tst')
app.use(express.json());

const ConnectionDB = require("./middleware/connection");
ConnectionDB();

app.use("/api/v1/user", require('./routes/user'))


app.listen(port, () => console.log(`Server up and running...at ${port}`))