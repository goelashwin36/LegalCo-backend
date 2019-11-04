const User = require('../../models/userModels/customerUser');
const Application = require('../../models/appModels/applications');
const Services = require('../../models/appModels/services');
const UserQuery = require('../../models/userModels/userQueries');

const Promise = require('bluebird')
const UserTransactions = require("../../models/transactions/customerUserDbTransactions");

module.exports.fetchProfile = (user) => {
    return new Promise((resolve, reject) => {
        console.log(1)


        return User.findOne({
            _id: user
        }).then((user) => {
            console.log(2)

            if (!user) {
                reject({
                    meta: {
                        success: false,
                        message: "User not found",
                        code: 404

                    }
                })
            } else {
                console.log(3)
                resolve({
                    payload: {
                        user: user
                    },
                    meta: {
                        success: true,
                        message: "User found",
                        code: 200

                    }
                })
            }
        })
    })
}

module.exports.requestService = (user, serviceId, name, description, addressLine1, addressLine2, city, state, pincode, mobile) => {

    return new Promise((resolve, reject) => {
        console.log(serviceId)
        return Services.findOne({
                serviceId: serviceId
            }).then(service => {
                if (!service) {
                    reject({
                        meta: {
                            success: false,
                            message: "Service not found",
                            code: 404

                        }
                    })
                } else {
                    return new Application({
                        applicant: user,
                        applicantName: name,
                        applicantMobile: mobile,
                        serviceId: serviceId,
                        description: description,
                        applicantAddress: {
                            line1: addressLine1,
                            line2: addressLine2,
                            city: city,
                            state: state,
                            pincode: pincode
                        },
                        status: 'pending',

                    }).save()
                }
            })
            .catch(error => {
                reject({
                    meta: {
                        success: false,
                        message: error.message,
                        code: 400
                    }
                })
            }).then(data => {

                resolve({
                    meta: {
                        success: true,
                        message: "Application submitted successfully",
                        code: 200
                    },
                    payload: {
                        application: data
                    }
                })
            })

    })
}


module.exports.viewApplications = (user) => {
    return new Promise((resolve, reject) => {

        return Application.find({
            applicant: user
        }).then(appln => {
            if (!appln) {
                reject({
                    meta: {
                        success: true,
                        message: "No applications found",
                        code: 200
                    },
                })
            } else {
                resolve({
                    meta: {
                        success: true,
                        message: "Application found",
                        code: 200
                    },
                    payload: {
                        applications: appln
                    }
                })
            }
        })
    })
}


module.exports.viewServices = (user) => {
    return new Promise((resolve, reject) => {

        return Services.find({
        }).then(data => {
            if (!data) {
                reject({
                    meta: {
                        success: true,
                        message: "No services found",
                        code: 200
                    },
                })
            } else {
                resolve({
                    meta: {
                        success: true,
                        message: "Services found",
                        code: 200
                    },
                    payload: {
                        services: data
                    }
                })
            }
        })
    })
}


module.exports.contact = (name, email, contact, description) => {
    return new Promise((resolve, reject) => {

        return new UserQuery({
                name: name,
                email: email,
                contact: contact,
                description: description
            }).save()
            .then(data => {
                resolve({
                    result: data,
                    meta: {
                        success: true,
                        message: "We'll contact you back soon!",
                        code: 200
                    }
                })
            }).catch(err => {
                console.log(err)
                
                    reject({
                        meta: {
                            success: false,
                            message: "An error occurred",
                            code: 500
                        }
                    })
            })
    });
}