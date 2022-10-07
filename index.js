const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const admin = require('./routes/admin')
const BusSchema = require('./schemas/BusStops')
const dataSet = require('./routes/tst')
app.use(express.json());

const ConnectionDB = require("./middleware/connection");
ConnectionDB();

async function newDoc(){

    const newStop = new BusSchema({
        city: dataSet.dataSet.data[0][0],
    })
    const newSave = await newStop.save()
    console.log(newSave)
}
newDoc();

// app.use("/api/v1/user" , require('./routes/user'))


app.listen(port, () => console.log(`Server up and running...at ${port}`))