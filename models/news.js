const {Schema, model} = require('mongoose');

const  news = new Schema({
    newsText: {
        type: String,
        required: true
    }
});

module.exports = model('News', news);