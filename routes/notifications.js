const pushNotificationService = require("./push-notifications.services");
const UserSchema = require('../schemas/User')

async function SendNotificationToDevice(req, res, next) {

    try {

        const user = await UserSchema.findOne({ phoneNumber: req.user });
        // console.log(user)
        UserSchema.findOne({ phoneNumber: req.user })
            .exec()
            .then(async product => {
                // console.log(deviceid);


                var message = {
                    app_id: process.env.ONE_SIGNAL_APP_ID,
                    contents: {
                        en: "Hello, Booking is successfull!"
                    },

                    included_segments: ["included_player_ids"],
                    include_player_ids: [user.device_id],
                    content_available: true,
                    small_icon: "ic_notification_icon",
                    data: {
                        PushTitle: "Booking Accepted!!"
                    },
                };

                pushNotificationService.SendNotification(message, (error, results) => {
                    if (error) {
                        return next(error);
                        console.log(error.message)
                    }
                    // return res.status(200).send({
                    //     message: "Success",
                    //     data: results,
                    // });
                    console.log({
                        message: "Success",
                        data: results
                    })

                });
            });
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
};

module.exports = { SendNotificationToDevice }