const express = require('express');
const router = express.Router();
const { Playlist, Song } = require('../db/models/');

router.get('/:playlistId', async (req, res) => {
    const { playlistId } = req.params;
    const playlist = await Playlist.findAll({
        where: {
            id: playlistId
        },
        include: 
            {
                model: Song
            }  
    })

    // if(!playlist){
    //     console.log("no playlist")
    // }

    res.json(playlist)
})

module.exports = router;
