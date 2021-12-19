const {Schema, model} = require('mongoose');

const comment = new Schema({
    name: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    commentDate: Date
});

module.exports = model('Comment', comment);