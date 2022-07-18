const express = require('express');
const { User, Song } = require('../../db/models');
const { restoreUser, requireAuth } = require('../../utils/auth');
const router = express.Router();


// GET all songs by currentUser
router.get('/songs', async (req, res) => {
    const user = await User.findByPk();
    const songs = await Song.findAll({
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
        ],
        where: {
            userId: user.id
        }
    })
    res.json(songs);
})

// Get Current User
router.get('/', restoreUser, async (req, res) => {
    const { user } = req;

    if(user){
        return res.json({
            ...user.toSafeObject()
        })
    } else {
        return res.json({})
    }
})

module.exports = router;
