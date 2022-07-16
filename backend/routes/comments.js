const express = require('express');

const router = express.Router();
const { Comment } = require('../db/models');

router.get('/', async (req, res) => {
    const comments = await Comment.findAll();

    res.json(comments);
})

module.exports = router;
