const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        require: true,
        min: 4
    },
    description: {
        type: String,
        required: true,
        max: 255,
        min: 4
    }
})

module.exports = mongoose.model('Services', serviceSchema)