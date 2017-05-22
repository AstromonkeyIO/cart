var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var BoardSchema = new Schema({
    id: ObjectId,
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    label: String,
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    created: Date
});

module.exports = mongoose.model('Board', BoardSchema);
