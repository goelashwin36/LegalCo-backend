const AgentUser = require('../../models/agentModels/agentUser');
const Application = require('../../models/appModels/applications');
const Services = require('../../models/appModels/services');
const Contact = require('../../models/userModels/userQueries');

const Promise = require('bluebird')

module.exports.fetchProfile = (user) => {
    return new Promise((resolve, reject) => {

        return AgentUser.findOne({
            _id: user
        }).then((user) => {

            if (!user) {
                reject({
                    meta: {
                        success: false,
                        message: "User not found",
                        code: 404

                    }
                })
            } else {
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
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
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
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
                }
            })
        })
    })
}

module.exports.viewAllOpenApplications = () => {
    return new Promise((resolve, reject) => {

        return Application.find({
            status: "pending"
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
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
                }
            })
        })
    })
}


module.exports.viewServices = () => {
    return new Promise((resolve, reject) => {

        return Services.find({}).then(data => {
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
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
                }
            })
        })
    })
}

module.exports.acceptAplication = (user, applicationId) => {

    return new Promise((resolve, reject) => {
        // console.log(serviceId)
        let currentAppln;

        return Application.findOne({
            _id: applicationId,
            status: "pending"
        }).then(appln => {
            if (!appln) {
                reject({
                    meta: {
                        success: false,
                        message: "Application not found",
                        code: 404

                    }
                })
            } else {
                currentAppln = appln
                return AgentUser.findOne({
                    _id: user
                })

            }
        }).then(userAgent => {

            return Application.findOneAndUpdate({
                _id: applicationId
            }, {
                agent: userAgent._id,
                agentName: userAgent.name,
                agentMobile: userAgent.mobile,
                status: "processing"
            })

        }).then(data => {

            resolve({
                meta: {
                    success: true,
                    message: "Application accepted successfully",
                    code: 200
                },
                payload: {
                    application: data
                }
            })
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
                }
            })
        })
    })
}

module.exports.closeAplication = (user, applicationId) => {

    return new Promise((resolve, reject) => {
        // console.log(serviceId)

        return Application.findOneAndUpdate({
            _id: applicationId,
            agent: user,
            status: "processing"
        }, {
            status: "closed"
        }).then(appln => {
            if (!appln) {
                reject({
                    meta: {
                        success: false,
                        message: "Application not found",
                        code: 404
                    }
                })
            } else {
                resolve({
                    meta: {
                        success: true,
                        message: "Application accepted successfully",
                        code: 200
                    },
                    payload: {
                        application: data
                    }
                })
            }
        }).catch(error => {
            reject({
                meta: {
                    success: false,
                    message: error.message,
                    code: 400
                }
            })
        })
    })
}