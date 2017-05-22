var express = require('express');
var router = express.Router();

var Board = require('../models/board');
var Item = require('../models/item');

router.post('/board', (req, res) => {
    var newBoard = new Board({
        user: req.body.user,
        label: req.body.label
    });

    newBoard.save((error, board) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'board': board
            }
        });
    });
});

router.delete('/board/:id', (req, res, next) => {
    Board.remove({ _id: req.params.id }, (error, board) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'board': board
            }
        });
    });
});

router.put('/board/:id', (req, res, next) => {
    Board.update(
        { _id: req.params.id },
        { $set: { label: req.body.label } },
        (error, board) => {
            if (error) {
                res.json({
                    'error': error
                });
            }

            res.json({
                'success': {
                    'board': board
                }
            });
        }
    );
});

router.get('/board/:id/items', (req, res) => {
    Item.find({ board: req.params.id }, (error, items) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'items': items
            }
        });
    });
});

module.exports = router;