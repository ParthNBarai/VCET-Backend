const express = require('express')
const router = express.Router();
const jwtToken = require('../authentication/GetJwtToken')
const UserSchema = require('../schemas/User')
const fetchuser = require('../middleware/fetchuser')

router.post("/register", async (req, res) => {
    // console.log(req.body)
    try {
        const newUser = new UserSchema({
            phoneNumber: req.body.phone,
            userName: req.body.userName,
            device_id: req.body.device_id,
            user_id: req.body.user_id,
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



module.exports = router