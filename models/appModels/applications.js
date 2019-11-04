const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    applicant: {
        type: String,
        required: true,
    },
    applicantName: {
        type: String,
        required: true
    },
    applicantMobile: {
        type: String,
        required: true
    },
    agent: {
        type: String,
    },
    agentName: {
        type: String,
    },
    agentMobile: {
        type: String
    },
    serviceId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        max: 255
    },
    applicantAddress: {
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String
        },
        city: {
            type: String,
            required: true

        },
        state: {
            type: String,
            required: true

        },
        pincode: {
            type: Number,
            required: true
        }
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'closed']
    }

})

module.exports = mongoose.model('Applications', applicationSchema)