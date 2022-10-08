const express = require('express')
const router = express.Router();
const jwtToken = require('../authentication/GetJwtToken')
const UserSchema = require('../schemas/User')
const fetchuser = require('../middleware/fetchuser')
const BookSchema = require('../schemas/Booking')
const Razorpay = require("razorpay");
const BusRoutes = require('../schemas/BusRoutes');
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
});


//Post route registering user : /api/v1/user/register
router.post("/register", async (req, res) => {

    try {
        const newUser = new UserSchema({
            phoneNumber: req.body.phone,
            userName: req.body.userName,
            device_id: req.body.device_id,
            user_id: req.body.user_id,
            longitude: req.body.longitude,
            latitude: req.body.latitude
        })
        const saved = await newUser.save();
        const jsontoken = await jwtToken.tokenGenerate(req, res, newUser.phoneNumber);

        res.status(200).json({
            success: 1,
            message: "Successful signup",
            token: jsontoken,
        });
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

//Post route login user : /api/v1/user/login
router.post('/login', async (req, res) => {
    try {
        const userFind = await UserSchema.findOne({ phoneNumber: req.body.phone })
        if (userFind) {
            const jsontoken = await jwtToken.tokenGenerate(req, res, req.body.phone);
            res.status(200).json({
                success: 1,
                message: "Successful login",
                token: jsontoken,
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

//Post route autologin user : /api/v1/user/autologin
router.post('/autologin', fetchuser, async (req, res) => {
    try {
        const userFind = await UserSchema.findOne({ phoneNumber: req.user })
        if (userFind) {
            res.status(200).json("Successfull")
        }
        else {
            res.status(401).json("Unauthorized")
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

//Route for booking a seat : /api/v1/user/book
router.post('/book', fetchuser, async (req, res) => {
    try {
        const newBooking = new BookSchema({
            phoneNumber: req.user,
            busNo: req.body.busNo,
            source: req.body.source,
            destination: req.body.destination,
            depaDate: req.body.depaDate,
            depaTime: req.body.depaTime,
            paymentId: req.body.paymentId,
            orderId: req.body.orderId,
            signature: req.body.signature,
            bookedSeatNotNo: req.body.seatNo
        })

        const busFind = await BusRoutes.findOne({ busNo: req.body.busNo })
        const newBookedSeat = {
            $push: {
                bookedSeatNo: req.body.bookedSeatNo
            }
        }
        const upd = await BusRoutes.updateOne(busFind, newBookedSeat)
        console.log(upd)
        const saved = await newBooking.save();
        res.status(200).json("Booking saved successfully!")
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})

//Route for booking a seat : /api/v1/user/create/orderId
router.post("/create/orderId", (req, res) => {

    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "rcp1"
    };
    instance.orders.create(options, function (err, order) {
        // console.log(order.id);
        res.send({ orderId: order.id });
    });
})

//Route for sending data between particular source and destination
router.post('/find/buses' ,async (req, res) => {
    try {
        const buses = await BusRoutes.find({ $and: [{ source: req.body.source }, { destination: req.body.destination }, { depaDate: new Date(req.body.date) }] })
        console.log(buses)
        res.status(200).json(buses)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
})


module.exports = router