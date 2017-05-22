var jwt = require('jsonwebtoken');
var config = require('../config');

const oneDay = '1d';

var TokenService = {
    createTokenForUser: (user) => {
        return jwt.sign(user, config.secret, {
            expiresIn: oneDay
        });
    },

    verifyToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (error, decoded) => {
                if (error) {
                    return reject(error);
                }

                return resolve(decoded);
            });
        });
    }
};

module.exports = TokenService;
