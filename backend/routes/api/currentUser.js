const express = require('express');
const { Song, Album } = require('../../db/models');
const { requireAuth, restoreUser } = require('../../utils/auth');
const router = express.Router();

// GET all albums created by the current user
router.get('/albums', requireAuth, async (req, res) => {
    const { user } = req;
    const albums = await Album.findAll({
        where: {
            userId: user.id
        },
        attributes: [
            "id",
            "userId",
            "title",
            "description",
            "createdAt",
            "updatedAt",
            "previewImage"
        ]
    });
    res.json(albums);
})

// GET all songs by currentUser
router.get('/songs', requireAuth, async (req, res) => {
    const { user } = req;
    
    const songs = await Song.findAll({
        where: {
            userId: user.id
        },
        attributes: [
            'id',
            'userId',
            'albumId',
            'title',
            'description',
            'url',
            'createdAt',
            'updatedAt',
            'previewImage'
        ]
    })
    
    res.json(songs);
})

// Get Current User
router.get('/', requireAuth , async (req, res) => {
    const { user } = req;

    if(user){
        res.status(200);
        res.json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        });
    } else {
        res.json({})
    }
})

module.exports = router;
