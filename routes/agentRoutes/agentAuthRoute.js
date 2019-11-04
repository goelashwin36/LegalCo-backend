const router = require('express').Router()
const authController = require("../../controllers/agentControllers/agentAuthController")


router.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let mobile = req.body.mobile;
    let services = req.body.services

    authController.signupUser(name, email, password, dob, gender, mobile, services)
        .then(data => { res.status(data.meta.code).json(data) })
        .catch(err => { res.status(err.meta.code).json(err) })
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    authController.loginUser(email, password)
        .then(data => { 
            const cookieConfig = {
                httpOnly: false,
                maxAge: 10000000
            }
            res.cookie('token', data.payload.token, cookieConfig).status(data.meta.code).send(data)

        })
        .catch(err => { res.status(err.meta.code).json(err) })
})


module.exports = router;