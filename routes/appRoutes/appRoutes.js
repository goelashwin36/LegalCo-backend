//Add services
//view contact details
//view applications

const router = require('express').Router()
const appController = require("../../controllers/appControllers/appController")


router.post('/contact', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let contact = req.body.contact;
    let description = req.body.description;
    console.log(name, email, contact, description)

    appController.contact(name, email, contact, description)
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