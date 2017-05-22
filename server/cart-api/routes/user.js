var express = require('express');
var router = express.Router();

var Board = require('../models/board');

router.get('/user/:id/boards', (req, res) => {
    Board.find({ user: req.params.id }, (error, boards) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'boards': boards
            }
        });
    });
});

module.exports = router;
