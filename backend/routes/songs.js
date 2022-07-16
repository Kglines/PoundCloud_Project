
const express = require('express');
const { Song, Artist, Album, User, sequelize } = require('../db/models')
const { requireAuth } = require('../utils/auth');
const router = express.Router();

// Get Details of a song from an id
router.get('/:songId', async (req, res) => {
    const song = await Song.findOne({
        where: {
            id: req.params.songId
        },
        include: [
        {
            model: Album,
            attributes: [
                'id',
                'title',
                'previewImage'
            ]
        },
        {   
            model: User,
            as: 'Artist',
            attributes: [
                'id',
                'userName',
                'previewImage'
            ]
        }],
    })
    res.json(song);
})

// GET all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll();

    res.json(songs);
});

module.exports = router;
