var express = require('express');
var router = express.Router();

require('../models/connection');
const Hashtag = require('../models/hashtag');

// POST new hashtag
router.post('/', (req, res) => {
    if (!req.body.tag) {
        res.json({ result: false, error: "Missing tag" });
        return;
    }

    const newTag = new Hashtag({
        tag: req.body.tag,
        count: req.body.count || 1
    });

    newTag.save()
        .then(doc => res.json({ result: true, hashtag: doc }))
        .catch(err => res.json({ result: false, error: err.message }));
});

// GET all hashtags
router.get('/', (req, res) => {
    Hashtag.find({})
        .sort({ count: -1 })
        .limit(10)
        .then(tags => res.json({ result: true, hashtags: tags }))
        .catch(err => res.json({ result: false, error: err.message }));
});

// GET specific hashtag
router.get('/:tag', (req, res) => {
    Hashtag.findOne({ tag: req.params.tag })
        .then(tag => res.json({ result: true, hashtag: tag }))
        .catch(err => res.json({ result: false, error: err.message }));
});

module.exports = router;