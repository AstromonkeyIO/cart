var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.post('/item', (req, res) => {
    Item.createUsingPagePreview(req.body.board, req.body.url)
    .then(item => {
        res.json({
            'success': {
                'item': item
            }
        });
    })
    .catch(error => {
        res.json({
            'error': error
        });
    });
});

router.delete('/item/:id', (req, res) => {
    Item.remove({ _id: req.params.id }, (error, item) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'item': item
            }
        });
    });
});

router.get('/item/:id', (req, res) => {
    Item.find({ _id: req.params.id }, (error, item) => {
        if (error) {
            res.json({
                'error': error
            });
        }

        res.json({
            'success': {
                'item': item
            }
        });
    });
});


module.exports = router;
