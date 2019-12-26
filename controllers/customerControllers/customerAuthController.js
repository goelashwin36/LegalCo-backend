const User = require('../../models/userModels/customerUser')
const jwt = require('jsonwebtoken')
const {
    loginValidation,
    registerValidation
} = require('../../validation/customerValidation')
const Promise = require('bluebird')
const UserTransactions = require("../../models/transactions/customerUserDbTransactions");


module.exports.signupUser = (name, email, password, dob, gender, mobile) => {
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

                return new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    dob: dob,
                    gender: gender,
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

module.exports.loginUser = (email, password, auto, token) => {
    return new Promise((resolve, reject) => {

        if (auto == 1) {

            if (!token) {

                reject({
                    meta: {
                        success: false,
                        message: "Token not present",
                        code: 400
                    }
                })
            }

            try {
                const verified = jwt.verify(token, process.env.USER_TOKEN_SECRET)
                let userId = verified._id


                return User.findOne({
                        _id: userId
                    })
                    .then(user => {
                        if (!user) {
                            reject({
                                meta: {
                                    success: false,
                                    message: "No user found with the provided email",
                                    code: 404
                                }
                            });
                        } else {
                            resolve({
                                meta: {
                                    success: true,
                                    message: "User logged in successfully !",
                                    code: 200
                                },
                                payload: {
                                    user: user,
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

            } catch (err) {
                reject({
                    meta: {
                        success: false,
                        message: "Invalid Token",
                        code: 400
                    }
                })
            }



        } else {
            let currentUser = null


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
                ////////////////////////////
                return User.findOne({
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
                            message: "Wrong email/password",
                            code: 403
                        }
                    });
                } else {
                    const token = jwt.sign({
                        _id: currentUser.id
                    }, process.env.USER_TOKEN_SECRET, {
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
            ////////////

        }
    })
}