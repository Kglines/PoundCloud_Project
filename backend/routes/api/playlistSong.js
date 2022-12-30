const express = require('express');
const router = express.Router();
const { Playlist, Song, PlaylistSong, User } = require('../../db/models/');
const { requireAuth } = require('../../utils/auth');
const { validatePlaylist } = require('../../utils/validation');

// GET Playlist Songs based on playlist id

router.get('/', async (req, res) => {
    
    const playlistSongs = await PlaylistSong.findAll()
    res.json({ playlistSongs })
})

// Add to playlist songs
router.post('/', requireAuth, async (req, res) => {
  const { playlistId, songId } = req.body;
  const { user } = req;

  const playlistSong = await PlaylistSong.create({
    playlistId,
    songId
  })

  res.status(201);
  res.json(playlistSong);
});

// Remove a song from playlist songs
router.delete('/:playlistSongId', requireAuth, async (req, res) => {
    const { playlistSongId } = req.params;
    const playlistSong = await PlaylistSong.findOne({
        where: {
            id: parseInt(playlistSongId)
        }
    });

    if(playlistSong){
        await playlistSong.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        })
    } else {
        const error = new Error("Playlist Song couldn't be found");
        error.status = 404;
        throw error;
    }
})

module.exports = router;
