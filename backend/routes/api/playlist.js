const e = require('express');
const express = require('express');
const router = express.Router();
const { Playlist, Song, PlaylistSong } = require('../../db/models/');
const { requireAuth } = require('../../utils/auth');
const { validatePlaylist } = require('../../utils/validation')

/******************** GET ********************/

// GET All Playlists
router.get('/', async (req, res) => {
    const Playlists = await Playlist.findAll();
    res.json({ Playlists });
})

// GET details of a Playlist from an id
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

/******************** POST ********************/

// Add a Song to a Playlist based on the Playlist's id
router.post('/:playlistId', requireAuth, async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if(playlist){
        if(song){
            if(playlist.userId === user.id){
                const newPlaylistSong = await PlaylistSong.create({
                    playlistId,
                    songId
                });
                const playlistSong = await PlaylistSong.findOne({
                    where: {
                        playlistId,
                        songId
                    },
                    attributes: [
                        "id",
                        "playlistId",
                        "songId"
                    ]
                })
                res.json(playlistSong);
            } else {
                const error = new Error("Unauthorized");
                error.status = 403;
                throw error;
            }
        } else {
            const error = new Error("Song couldn't be found");
            error.status = 404;
            throw error;
        }
    } else {
        const error = new Error("Playlist couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Create a Playlist
router.post('/', [requireAuth, validatePlaylist], async (req, res) => {
    const { user } = req;
    const { name, imageUrl } = req.body;

    const playlist = await Playlist.create({
        userId: user.id,
        name,
        previewImage: imageUrl
    })
    res.status(201);
    res.json(playlist);
})

/******************** PUT ********************/

// Edit a Playlist
router.put('/:playlistId', [requireAuth, validatePlaylist], async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;
    const { name, imageUrl } = req.body;

    const playlist = await Playlist.findByPk(playlistId);

    if(playlist){
        if(playlist.userId === user.id){
            await playlist.update({
                name,
                previewImage: imageUrl
            });
            res.json(playlist);
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Playlist couldn't be found");
        error.status = 404;
        throw error;
    }
})


/******************** DELETE ********************/

// Delete a playlist
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const { user } = req;
    const { playlistId } = req.params;

    const playlist = await Playlist.findByPk(playlistId);

    if(playlist){
        if(playlist.userId === user.id){
            await playlist.destroy();

            res.json({
                message: "Successfully deleted",
                statusCode: 200
            })
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Playlist couldn't be found");
        error.status = 404;
        throw error;
    }
})


module.exports = router;
