const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 255,
        min: 4
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    dob: {
        //yyyy-mm-dd
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['m', 'f', 'o']
    },
    mobile: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)