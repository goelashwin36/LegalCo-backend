const router = require('express').Router()
const verify = require('./customerRoutes/verifyCustomerToken')

router.get('/', verify, (req, res) => {
    res.send("Random data you shouldn't access!!")

})

module.exports = router