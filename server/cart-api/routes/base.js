var express = require('express');
var router = express.Router();

var TokenService = require('../services/token-service');

// Route middleware to verify a token
router.use((req, res, next) => {

    // Check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // Decode token
    if (token) {
        // Verify secret and check if the token is valid or not
        TokenService.verifyToken(token)
        .then(decoded => {
            req.decoded = decoded;
            next();
        })
        .catch(error => {
            return res.json({
                success: false,
                message: 'Failed to authenticate token.'
            });
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });
    }
});

module.exports = router;
