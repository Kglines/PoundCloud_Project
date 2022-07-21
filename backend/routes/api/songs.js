
const express = require('express');
const { Song, Album, User, Comment } = require('../../db/models')
const { validateSong } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();

// GET all comments by a Song's id
router.get('/:songId/comments', async (req, res) => {
    const { songId } = req.params;
    const song = await Song.findByPk(songId, {
        include: [
            {
                model: Comment,
                include: [
                    {
                        model: User,
                        attributes: [
                            "id", "username"
                        ]
                    }
                ]
            }
        ]
    }) 
    if(song){
        res.json({ Comments: song.Comments })
    } else {
        const error = new Error("Song couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Get Details of a song from an id
router.get('/:songId', requireAuth, async (req, res) => {
    const { songId } = req.params;
    const song = await Song.findByPk(songId, {
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
        include: [
            {   
                model: User,
                as: 'Artist',
                attributes: [
                    'id',
                    'username',
                    'previewImage'
                ]
            },
            {
                model: Album,
                attributes: [
                    'id',
                    'title',
                    'previewImage'
                ]
            }
        ],
    })
    if(song){
        res.json(song);
    } else {
        const error = new Error("Song couldn't be found");
        error.status = 404;
        throw error;
    }
})

// Delete a song
router.delete('/:songId', requireAuth, async (req, res) => {
    const { user } = req;
    const { songId } = req.params;

    const song = await Song.findByPk(songId);

    if(song){
        if(song.userId === user.id){
            await song. destroy();
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
        const error = new Error("Song not found");
        error.status = 404;
        throw error
    }
})

// GET all songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll({
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
        ]
    });

    res.json(songs);
});

// Edit a song
router.put('/:songId', [requireAuth, validateSong], async (req, res) => {
    const { user } = req;
    const { songId } = req.params;
    const { title, description, url, imageUrl } = req.body;

    const song = await Song.findByPk(songId);

    if(song){
        if(song.userId === user.id){
            await song.update({
                title,
                description,
                url,
                imageUrl
            })
            res.json(song);
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Song couldn't be found")
        error.status = 404;
        throw error;
    }
})

module.exports = router;
