const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, maxlength: 280 },
    hashtags: [String],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model('Tweet', tweetSchema);