const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    // console.log(req.headers.cookie)
    console.log(req.cookies)
    const token = req.cookies.token

    if (!token) {
        res.status(401).send("Access Denied")
    }

    try {
        const verified = jwt.verify(token, process.env.AGENT_TOKEN_SECRET)
        req.user = verified._id
        next()
    }
    catch (err) {
        res.status(400).send("Invalid Token")
    }
}