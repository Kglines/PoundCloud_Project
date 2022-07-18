const express = require('express');
const { Album } = require('../../db/models');
const router = express.Router();

router.get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
})


module.exports = router;
