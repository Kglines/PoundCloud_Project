const express = require('express');
const { Album, User, Song } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateAlbum, validateSong } = require('../../utils/validation')
const router = express.Router();

// Create a song for an Album based on the Album's id
router.post('/:albumId/song', [requireAuth, validateSong], async (req, res) => {
    const { albumId } = req.params;
    const { title, description, imageUrl, url } = req.body;
    const { user } = req;
    const album = await Album.findByPk(albumId);

    if(album){
        if(album.userId === user.id){
            const newSong = await Song.create({
                userId: user.id,
                albumId,
                title,
                description,
                url,
                previewImage: imageUrl,
            })
            res.status(201);
            res.json(newSong); 
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Album couldn't be found");
        error.status = 404;
        throw error;
    }

})

// Create an Album
router.post('/', [requireAuth, validateAlbum], async (req, res) => {
    const { user } = req;
    const { title, description, imageUrl } = req.body;
    const album = await Album.create({
        userId: user.id,
        title,
        description,
        previewImage: imageUrl
    })
    res.status(201);
    res.json(album);
})

// EDIT an Album
router.put('/:albumId', requireAuth, async (req, res) => {

})

// GET details of an Album from an id
router.get('/:albumId', async (req, res) => {
    const { albumId } = req.params;
    const album = await Album.findByPk(albumId, {
        attributes: [
            "id",
            "userId",
            "title",
            "description",
            "createdAt",
            "updatedAt",
            "previewImage"
        ],
        include: [
            {
                model: User,
                as: 'Artist',
                attributes: [
                    "id", 
                    "username",
                    "previewImage"
                ]
            },
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
                ]
            }
        ]
    });

    if(!album){
        const error = new Error("Album couldn't be found");
        error.status = 404;
        throw error;
    }
    res.json(album);
})

// Gets all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();
    res.json(albums);
})


module.exports = router;
