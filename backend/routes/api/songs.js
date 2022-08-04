const express = require('express');
const { Song, Album, User, Comment } = require('../../db/models')
const { validateSong, validateComment, validateQuery } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const router = express.Router();


/******************** GET ********************/

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

// GET all songs
router.get('/', validateQuery, async (req, res) => {
    let page = parseInt(req.query.page, 10);
    let size = parseInt(req.query.size, 10);

    if(Number.isNaN(page)) page = 0;
    if(Number.isNaN(size)) size = 20;

    if(page < 0) page = 0;
    if(page > 10) page = 10;

    if(size < 0) size = 0;
    if(size > 20) size = 20;

    const Songs = await Song.findAll({
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
        limit: size,
        offset: size * (page - 1)
    });
    
    res.json({ 
        Songs, 
        page, 
        size 
    });
});

/******************** POST ********************/

// Create a Comment for a song based on the Song's id
router.post('/:songId/comments', [requireAuth, validateComment], async (req, res) => {
    const { user } = req;
    const { songId } = req.params;
    const { body } = req.body;

    const song = await Song.findByPk(songId);

    if(song){
        const comment = await Comment.create({
            body,
            songId,
            userId: user.id
        });
        res.json(comment);
    } else {
        const error = new Error("Song couldn't be found")
        error.status = 404;
        throw error;
    }


})

/******************** PUT ********************/

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
});

/******************** DELETE ********************/

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
        const error = new Error("Song couldn't be found");
        error.status = 404;
        throw error
    }
})

module.exports = router;
