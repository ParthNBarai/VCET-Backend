const { sign, verify } = require("jsonwebtoken");
require("dotenv/config");

//Function to create new JWT token on every login
async function tokenGenerate(req, res, user) {
    try {
        return sign({ result: user }, process.env.Token_id, {
            expiresIn: 86400
        });
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json(err.message);
    }
}

module.exports = { tokenGenerate }
