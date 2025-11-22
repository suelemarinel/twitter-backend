require('dotenv').config();
require('./models/connection');

const express = require('express');
const cors = require('cors');

const app = express()

// Middleware
app.use(cors());
app.use(express.json());


// Routes
const tweetRouter = require('./routes/tweet');
const hashtagRouter = require('./routes/hashtag');
const likeRouter = require('./routes/like');
const userRouter = require('./routes/users');

app.use('/users', userRouter); // Authentification
app.use('/tweets', tweetRouter); // Tweet management
app.use('/hashtags', hashtagRouter); // Hashtag tracking
app.use('/likes', likeRouter); // Like system

module.exports = app;