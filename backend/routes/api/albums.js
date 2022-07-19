const express = require('express');
const { Album } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateAlbum } = require('../../utils/validation')
const router = express.Router();


// Create an Album
router.post('/', [requireAuth, validateAlbum], async (req, res) => {
    const { user } = req;
    const { title, description, imageUrl } = req.body;
    const album = await Album.create({
        userId: user.id,
        title,
        description,
        previewImage: imageUrl
    })
    res.status(201);
    res.json(album);
})


// Gets all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
})


module.exports = router;
