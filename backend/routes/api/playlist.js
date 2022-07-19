const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('../../db/models/');

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

module.exports = router;
