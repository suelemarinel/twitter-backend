const mongoose = require('mongoose');

const hashtagSchema = new mongoose.Schema({
    tag: String, 
    count: Number 
});

module.exports = mongoose.model('Hashtag', hashtagSchema);