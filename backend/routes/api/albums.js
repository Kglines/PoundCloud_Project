const express = require('express');
const { Album } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


// Create an Album
router.post('/albums', requireAuth, async (req, res) => {
    const { user } = req;
    const { title, description, imageUrl} = req.body;
    const album = await Album.create({
        userId: user.id,
        title,
        description,
        imageUrl
    })
    res.json(album);
})


// Gets all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
})


module.exports = router;
