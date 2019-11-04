const Service = require('../../models/appModels/services');

module.exports.addService = (serviceId, name, description) => {
    return new Promise((resolve, reject) => {

        return new Service({
                serviceId: serviceId,
                name: name,
                description: description
            }).save()
            .catch(err => {
                console.log(err)
                if (err.code == 11000) {
                    reject({
                        meta: {
                            success: false,
                            message: "Service already exists",
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
                        message: "Service added successfully",
                        code: 200
                    }
                })
            })
    });
}