const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {

    try {
        if (req.header("Authorization") === undefined) {
            throw new Error("Unauthorized")
        }
        const token = req.header("Authorization").replace("Bearer ", "")
        const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET)
        req.user = verified._id
        next()

    } catch (err) {
        res.status(400).send("Invalid Token")

    }

}