const express = require('express');
const router = express.Router();
const { Playlist, Song, PlaylistSong, User } = require('../../db/models/');
const { requireAuth } = require('../../utils/auth');
const { validatePlaylist } = require('../../utils/validation');

// GET Playlist Songs based on playlist id

router.get('/', async (req, res) => {
    // console.log('************************', req);
    // const playlist = await Playlist.findOne({ where: {
    //     playlistId: playlist.id
    // }})
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

module.exports = router;
