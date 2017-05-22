var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var User = require('../models/user');

var TokenService = require('../services/token-service');

router.post('/login', (req, res) => {
    User.login(req.body.email, req.body.password, req.body.username)
    .then(user => {
        var token = TokenService.createTokenForUser(user);
        res.json({
            'success': {
                'user': user,
                'token': token
            }
        });
    })
    .catch(error => {
        res.json({
            'error': error
        });
    });
});

router.post('/register', (req, res) => {
    User.register(req.body.email, req.body.password, req.body.username)
    .then(user => {
        var token = TokenService.createTokenForUser(user);
        res.json({
            'success': {
                'user': user,
                'token': token
            }
        });
    })
    .catch(error => {
        res.json({
            'error': error
        });
    });
});

module.exports = router;
