// const authController = require("../../controllers/customerControllers/customerAuthController")
const User = require('../userModels/customerUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt-nodejs')
const Promise = require("bluebird");


module.exports.hashGen = (input) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                console.log(err)
                reject(err);
            } else {
                bcrypt.hash(input, salt, null, (err, hash) => {
                    console.log(err)
                    if (err) {
                        reject(err);
                    } else {
                        console.log("hash", hash)
                        resolve(hash);
                    }
                });
            }
        });
    });
};


module.exports.comparePassword = (user, input_password) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(input_password, user.password, (err, validPassword) => {
            if (err)
                reject(err);
            else
                resolve(validPassword);
        });
    });
}
