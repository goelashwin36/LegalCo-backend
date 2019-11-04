const GeneralQuery = require('../../models/appModels/generalQueries');

module.exports.contact = (name, email, contact, description) => {
    return new Promise((resolve, reject) => {

        return new GeneralQuery({
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