const router = require('express').Router()
const userController = require("../../controllers/customerControllers/customerUserController")
const verify = require('./verifyCustomerToken')

router.use(verify)


router.get('/fetchProfile', (req, res) => {
    let user = req.user

    userController.fetchProfile(user)
        .then(data => { res.status(data.meta.code).json(data) })
        .catch(err => { res.status(err.meta.code).json(err) })
})

router.post('/requestService', (req, res) => {
    console.log(req.body)
    let user = req.user
    let serviceId = req.body.serviceId
    let name = req.body.name
    let mobile = req.body.mobile
    let description = req.body.description
    let addressLine1 = req.body.addressLine1
    let addressLine2 = req.body.addressLine2
    let city = req.body.city
    let state = req.body.state
    let pincode = req.body.pincode

    userController.requestService(user, serviceId, name, description, addressLine1, addressLine2, city, state, pincode, mobile)
        .then(data => { res.status(data.meta.code).json(data) })
        .catch(err => { res.status(err.meta.code).json(err) })
})

router.get('/viewApplications', (req, res) => {
    let user = req.user

    userController.viewApplications(user)
        .then(data => { res.status(data.meta.code).json(data) })
        .catch(err => { res.status(err.meta.code).json(err) })
})

router.get('/viewServices', (req, res) => {
    let user = req.user
    console.log(user)

    userController.viewServices(user)
        .then(data => {
            console.log(data)
            console.log(data.meta.code)
            res.status(data.meta.code).json(data) })
        .catch(err => { res.status(err.meta.code).json(err) })
})

router.post('/contact', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let description = req.body.description;

    userController.contact(name, email, contact, description)
        .then(data => {
            console.log(data)
            res.status(data.meta.code).json(data)
        })
        .catch(err => {
            console.log(err)
            res.status(err.meta.code).json(err)
        })
})


module.exports = router;