// Validation

const Joi = require('@hapi/joi')

const registerValidation = (data) => {

    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().min(3).required().email(),
        password: Joi.string().min(6).required(),
        dob: Joi.string().regex(/^[0-9]{4}[-][0-9]{2}[-][0-9]{2}$/).required(),
        gender: Joi.string().required().regex(/^[mof]{1}$/)

    }
    console.log("Inside validation")

    return Joi.validate(data, schema)
}

const loginValidation = (data) => {

    const schema = {
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    }
    return Joi.validate(data, schema)
}


module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation