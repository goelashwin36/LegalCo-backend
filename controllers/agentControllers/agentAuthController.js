const AgentUser = require('../../models/agentModels/agentUser')
const jwt = require('jsonwebtoken')
const {
    loginValidation,
    registerValidation
} = require('../../validation/customerValidation')
const Promise = require('bluebird')
const UserTransactions = require("../../models/transactions/customerUserDbTransactions");


module.exports.signupUser = (name, email, password, dob, gender, mobile, services) => {
    return new Promise((resolve, reject) => {
        console.log(dob)

        // Input Validation
        return registerValidation({
            "name": name,
            "email": email,
            "password": password,
            "dob": dob,
            "gender": gender
        }).catch(error => {
            console.log("err")
            if (error) {
                reject({
                    meta: {
                        success: false,
                        message: error.message,
                        code: 400
                    }
                })
            }
            // Encrypting password and saving user
        }).then(() => {
            console.log("Done")

            return UserTransactions.hashGen(password).then(hashedPassword => {

                return new AgentUser({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    dob: dob,
                    gender: gender,
                    services: services,
                    mobile: mobile

                }).save()
            })
        }).catch(err => {
            // Check if user already exists
            if (err.code == 11000) {
                reject({
                    meta: {
                        success: false,
                        message: "User already exists",
                        code: 400
                    }
                })
            } else {
                reject({
                    meta: {
                        success: false,
                        message: "An error occurred",
                        code: 500
                    }
                })
            }
        }).then(data => {
            resolve({
                result: data,
                meta: {
                    success: true,
                    message: "User added successfully",
                    code: 200
                }
            })
        })
    });
}

module.exports.loginUser = (email, password) => {

    let currentUser = null

    return new Promise((resolve, reject) => {

        // Input Validation
        return loginValidation({
            "email": email,
            "password": password
        }).catch(error => {
            if (error) {
                reject({
                    meta: {
                        success: false,
                        message: "Invalid data",
                        code: 400
                    }
                })
            }
        }).then(() => {

            return AgentUser.findOne({
                email: email
            })

        }).then(user => {
            if (!user) {
                reject({
                    meta: {
                        success: false,
                        message: "No user found with the provided email",
                        code: 404
                    }
                });
            } else {
                currentUser = user;

                return UserTransactions.comparePassword(user, password);

            }
        }).then(validPassword => {
            if (!validPassword) {
                reject({
                    meta: {
                        success: false,
                        message: "Wrong password entered",
                        code: 403
                    }
                });
            } else {
                const token = jwt.sign({
                    _id: currentUser.id
                }, process.env.AGENT_TOKEN_SECRET, {
                    expiresIn: '12h'
                })

                resolve({
                    meta: {
                        success: true,
                        message: "User logged in successfully !",
                        code: 200
                    },
                    payload: {
                        user: currentUser,
                        token: token
                    }
                })
            }
        }).catch(err => {
            console.error(err);
            reject({
                meta: {
                    success: false,
                    message: err.message,
                    code: 500
                }
            });
        });
    })

}