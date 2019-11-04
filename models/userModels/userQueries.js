const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 4
    },
    contact: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserQuery', contactSchema)