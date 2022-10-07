var jwt = require('jsonwebtoken');
require("dotenv/config");
const dbfunc = require("../authentication/GetJwtToken");


const fetchnewuser = async (req, res, next) => {
    const refreshToken = req.header('refresh_token');
    if (!refreshToken) {
        res.status(401).send({ success: false, error: "Please authenticate using a valid token" })
    }
    try {

        const data = jwt.verify(refreshToken, process.env.Refresh_token_id);
        const user = data.result;

        // console.log(user);

        const new_token = await dbfunc.tokenGenerate(user);
        res.status(200).json(new_token);
        next();
    } catch (error) {
        console.log(error)
        res.status(401).send({ success: false, error: "Please authenticate using a Valid token" })
    }
}

module.exports = fetchnewuser;