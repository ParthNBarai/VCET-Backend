const dataSet = require('./tst')
const BusSchema = require('../schemas/BusStops')
const BusRoutes = require('../schemas/BusRoutes')
var i = 0;
var addStop = {};

// console.log(dataSet.dataSet.data[0][0])

async function dataAdd() {

    const document = await BusRoutes.findOne({ city: "Thane" })



    console.log(dataSet.dataSet.data[i][1])
    addStop = {

        $push: {
            data: {

                "route": dataSet.dataSet.data[i][1],
                "busNumber": dataSet.dataSet.data[i][2]
            }
        }

    }
    console.log(addStop)
    i++;
    const saved = await BusRoutes.updateOne(document, addStop)
    console.log(saved)

}


setInterval(dataAdd, 1000);


