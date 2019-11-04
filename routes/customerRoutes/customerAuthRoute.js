const router = require('express').Router()
const authController = require("../../controllers/customerControllers/customerAuthController")

router.post('/register', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let dob = req.body.dob;
    let gender = req.body.gender;
    let mobile = req.body.mobile;


    authController.signupUser(name, email, password, dob, gender, mobile)
        .then(data => {
            res.status(data.meta.code).json(data)
        })
        .catch(err => {
            res.status(err.meta.code).json(err)
        })
})

router.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let auto = req.body.auto

    console.log(email)
    console.log(password)
    console.log(auto)
    console.log(req.cookies.token)

    authController.loginUser(email, password, auto, req.cookies.token)
        .then(data => {
            console.log(data)
            const cookieConfig = {
                httpOnly: true,
                maxAge: 10000000,
                secure: true
            }
            res.cookie('token', data.payload.token, cookieConfig).status(data.meta.code).send(data)
        })
        .catch(err => {
            res.status(err.meta.code).json(err)
        })
})

module.exports = router;