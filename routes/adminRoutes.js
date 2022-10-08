const express = require('express')
const router = express.Router();
const AdminSchema = require('../schemas/Admin')
const BusRoutes = require('../schemas/BusRoutes')

//Post route registering user : /api/v1/user/register
router.post("/register", async (req, res) => {

    try {
        const newAdmin = new AdminSchema({
            phoneNumber: req.body.phone,
            userName: req.body.userName,
            device_id: req.body.device_id,
            user_id: req.body.user_id,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        })
        const saved = await newAdmin.save();


        res.status(200).json({
            success: 1,
            message: "Successful signup",
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

//Post route login user : /api/v1/user/login
router.post('/login', async (req, res) => {
    try {
        const userFind = await AdminSchema.findOne({ phoneNumber: req.body.phone })
        if (userFind) {
            res.status(200).json({
                success: 1,
                message: "Successful login",
            });
            // res.status(200).json("Successfull")
        }
        else {
            res.status(401).json("Unauthorized")
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

//Post route adding new bus : /api/v1/admin/busRoutes

router.post('/busRoutes' , async (req,res) =>{

    const stopsCoordinates = [];
    
    try {
        const addTrip = new BusRoutes({
            busNo: req.body.busNo,
            travelsName: req.body.travelsName,
            source: req.body.source,
            destination: req.body.destination,
            "sourceCoordinates.latitude": req.body.sourceCoordinates.latitude,
            "sourceCoordinates.longitude": req.body.sourceCoordinates.longitude,
            "destCoordinates.latitude": req.body.destCoordinates.latitude,
            "destCoordinates.longitude": req.body.destCoordinates.longitude,
        })
        

        
        for (let i = 0; i < req.body.stopsCoordinates.length; i++) {
            const newObj = {
                latitude: req.body.stopsCoordinates[i].latitude,
                longitude: req.body.stopsCoordinates[i].longitude
            }
            addTrip.stopsCoordinates.push(newObj)

        }
        const saved = await addTrip.save();
        console.log(saved)
        res.status(200).json("Done")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})


module.exports = router