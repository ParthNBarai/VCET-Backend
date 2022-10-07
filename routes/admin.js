const dataSet = require('./tst')
const BusSchema = require('../schemas/BusStops')
var i=0;
var addStop = {}; 

// console.log(dataSet.dataSet.data[0][0])

async function dataAdd() {

    const document = await BusSchema.findOne({ city: "Thane" })
    


    console.log(dataSet.dataSet.data[i][1])
    addStop = {

        $push: {
            data: {

                "stopName": dataSet.dataSet.data[i][1],
                "longitude": dataSet.dataSet.data[i][2],
                "latitude": dataSet.dataSet.data[i][3]
            }
        }

    }
    console.log(addStop)
    i++;
    const saved = await BusSchema.updateOne(document, addStop)
    console.log(saved)
   
}


    setInterval(dataAdd, 1000);
    

