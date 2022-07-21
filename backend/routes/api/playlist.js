const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('../../db/models/');
const { requireAuth } = require('../../utils/auth');
const { validatePlaylist } = require('../../utils/validation')

router.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await Playlist.findByPk(playlistId, {
        attributes: [
            "id",
            "userId",
            "name",
            "createdAt",
            "updatedAt",
            "previewImage"
        ],
        include: [
            {
                model: Song,
                attributes: [
                    "id",
                    "userId",
                    "albumId",
                    "title",
                    "description",
                    "url",
                    "createdAt",
                    "updatedAt",
                    "previewImage"
                ],
                through: { attributes: [] }
            }
        ]
    });

    if(!playlist){
        const error = new Error("Playlist couldn't be found");
        error.status = 404;
        throw error;
    }

    res.json(playlist)
})

// Create a Playlist
router.post('/', [requireAuth, validatePlaylist], async (req, res) => {
    const { user } = req;
    const { name, imageUrl } = req.body;

    const playlist = await Playlist.create({
        userId: user.id,
        name,
        imageUrl
    })
    res.status(201);
    res.json(playlist);
})

module.exports = router;
