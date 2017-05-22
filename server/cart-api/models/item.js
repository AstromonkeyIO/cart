var mongoose = require('mongoose'),
    PagePreviewer = require("page-previewer"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ItemSchema = new Schema({
    id: ObjectId,
    board: {
        type: String,
        ref: 'Board',
        required: true
    },
    url: { type: String, required: true },
    label: String,
    image: String,
    description: String,
    created: Date
});

ItemSchema.statics.createUsingPagePreview = function(board, url) {
    return new Promise((resolve, reject) => {
        PagePreviewer(url, (error, data) => {
            if(error) {
                return reject(false);
            }

            var newItem = new this();
            if (data) {
                newItem.board = board;
                newItem.url = url;
                newItem.label = data.title;
                newItem.description = data.description;
                if (data.images && data.images.length) {
                    newItem.image = data.images[0];
                }
            } else {
                newItem.board = board;
                newItem.url = url
            }

            newItem.save((error, item) => {
                if (error) {
                    return reject(error);
                }

                return resolve(item);
            });
        });
    });
};


module.exports = mongoose.model('Item', ItemSchema);
