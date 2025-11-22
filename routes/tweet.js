var express = require('express');
var router = express.Router();
const User = require('../models/users');
const Hashtag = require('../models/hashtag');

require('../models/connection');
const Tweet = require('../models/tweet');

// POST un nouveau tweet
router.post('/', (req, res) => {
    if (!req.body.token || !req.body.content) {
        res.json({ result: false, error: "Missing token or content" });
        return;
    }

    User.findOne({ token: req.body.token })
        .then(user => {
            if (!user) {
                res.json({ result: false, error: "User not found" });
                return;
            }

            const newTweet = new Tweet({
                user: user._id,
                content: req.body.content,
                hashtags: req.body.hashtags || [],
                likes: []
            });

            newTweet.save()
                .then(doc => {
                    if(req.body.hashtags && req.body.hashtags.length > 0) {
                        req.body.hashtags.forEach(tag => {
                            Hashtag.findOne({ tag: tag})
                            .then(existingTag => {
                                if(existingTag){
                                    Hashtag.updateOne(
                                        {tag : tag},
                                        {$inc : { count:1}}
                                    ).then(() => {});
                                } else {
                                    const newHashtag = new Hashtag({
                                        tag: tag,
                                        count: 1
                                    });
                                    newHashtag.save().then(() => {});
                                }
                            });
                        });
                    }
                    res.json({ result: true, tweet: doc });
                })
                .catch(err => res.json({ result: false, error: err.message }));
        }) 
        .catch(err => res.json({ result: false, error: err.message }));
});


// GET tous les tweets
router.get('/', (req, res) => {
    Tweet.find({})
        .populate('user', 'username')
        .sort({ createdAt: -1 }) 
        .then(tweets => res.json({ result: true, tweets: tweets }))
        .catch(err => res.json({ result: false, error: err.message }));
});

//Delete
router.delete('/:id', (req, res) => {
    
    Tweet.findById(req.params.id)
        .then(tweet => {
            if (!tweet) {
                res.json({ result: false, error: "Tweet not found" });
                return;
            }

            if (tweet.hashtags && tweet.hashtags.length > 0) {
                tweet.hashtags.forEach(tag => {
                    Hashtag.findOne({ tag: tag })
                        .then(existingTag => {
                            if (existingTag) {
                                if (existingTag.count > 1) {
                                    
                                    Hashtag.updateOne(
                                        { tag: tag },
                                        { $inc: { count: -1 } }
                                    ).then(() => {});
                                } else {
                                    
                                    Hashtag.deleteOne({ tag: tag })
                                        .then(() => {});
                                }
                            }
                        });
                });
            }

            Tweet.deleteOne({ _id: req.params.id })
                .then(() => res.json({ result: true, message: "Tweet deleted" }))
                .catch(err => res.json({ result: false, error: err.message }));
        })
        .catch(err => res.json({ result: false, error: err.message }));
});


module.exports = router;