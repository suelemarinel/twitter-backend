var express = require('express');
var router = express.Router();

require('../models/connection');
const Like = require('../models/like');
const User = require('../models/users');

// POST a like
router.post('/', (req, res) => {
    if (!req.body.token || !req.body.tweet) {
        res.json({ result: false, error: "Missing token or tweet" });
        return;
    }

    User.findOne({ token: req.body.token })
        .then(user => {
            if (!user) {
                res.json({ result: false, error: "User not found" });
                return;
            }

            const newLike = new Like({
                user: user._id,
                tweet: req.body.tweet
            });

            newLike.save()
                .then(doc => res.json({ result: true, like: doc }))
                .catch(err => res.json({ result: false, error: err.message }));
        })
        .catch(err => res.json({ result: false, error: err.message }));
});

// DELETE (unlike)
router.delete('/', (req, res) => {
    if (!req.body.token || !req.body.tweet) {
        res.json({ result: false, error: "Missing user or tweet" });
        return;
    }
    
    User.findOne({ token: req.body.token })
        .then(user => {
            if (!user) {
                res.json({ result: false, error: "User not found" });
                return;
            }

            Like.deleteOne({ user: user._id, tweet: req.body.tweet })
                .then(() => res.json({ result: true, message: "Like removed" }))
                .catch(err => res.json({ result: false, error: err.message }));
        })
        .catch(err => res.json({ result: false, error: err.message }));
});

// GET all likes
router.get('/', (req, res) => {
    Like.find({})
        .then(likes => res.json({ result: true, likes: likes }))
        .catch(err => res.json({ result: false, error: err.message }));
});

module.exports = router;