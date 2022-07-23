const express = require('express');

const router = express.Router();
const { Comment } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { validateComment } = require('../../utils/validation');

router.get('/', async (req, res) => {
    const comments = await Comment.findAll();

    res.json(comments);
})


/******************** PUT ********************/

// Edit a Comment
router.put('/:commentId', [requireAuth, validateComment], async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;
    const { body } = req.body;

    const comment = await Comment.findByPk(commentId);
    if(comment){
        if(comment.userId === user.id){
            await comment.update({
                body
            });
            res.json(comment)
        } else {
            const error = new Error("Unauthorized");
            error.status = 403;
            throw error;
        }
    } else {
        const error = new Error("Comment couldn't be found");
        error.status = 404;
        throw error;
    }
})

/******************** DELETE ********************/

// Delete a Comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const { user } = req;
    const { commentId } = req.params;

    const comment = await Comment.findByPk(commentId);

    if(comment){
        if(comment.userId === user.id){
            await comment.destroy();
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
        const error = new Error("Comment couldn't be found");
        error.status = 404;
        throw error
    }
});

module.exports = router;
