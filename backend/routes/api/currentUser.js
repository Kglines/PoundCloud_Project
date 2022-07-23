const express = require('express');
const { Song, Album, User, Playlist } = require('../../db/models');
const { requireAuth, restoreUser, setTokenCookie } = require('../../utils/auth');
const router = express.Router();

/******************** GET ********************/

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

// GET all Playlists created by the current user
router.get('/playlists', requireAuth, async (req, res) => {
    const { user } = req;

    const playlists = await Playlist.findAll({
        where: {
            userId: user.id
        },
        attributes: [
            "id",
            "userId",
            "name",
            "createdAt",
            "updatedAt",
            "previewImage"
        ]
    })
    res.json(playlists);
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
    const jToken = await setTokenCookie(res, user);
    const currentUser = await User.findOne({
        where: {
            id: req.user.id
        },
        attributes: ["id", "firstName", "lastName", "email"]
    });

    if(currentUser){
        currentUser.dataValues.token = jToken;
        return res.json(currentUser)
    } else {
        currentUser.dataValues.token = "";
        return res.json({})
    }
})

module.exports = router;
