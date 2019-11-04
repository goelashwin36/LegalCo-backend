//Add services
//view contact details
//view applications

const router = require('express').Router()
const adminController = require("../../controllers/appControllers/adminController")


router.post('/addService', (req, res) => {
    let serviceId = req.body.serviceId;
    let name = req.body.name;
    let description = req.body.description;

    adminController.addService(serviceId, name, description)
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