const router = require('express').Router();

const Comments = require('./comments-model.js');

const verifyId = require('./verifyId.js');


// /api/comments
router.get('/', (req, res) => {
    const { id } = req.decodedJwt;

    Comments.findSaved(id)
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error while trying to find the saved comments', err });
        });
});


// /api/comments
router.post('/', (req, res) => {
    const comment = req.body;
    const { id } = req.decodedJwt;
    if(comment.troll_username && comment.comment_toxicity && comment.comment) {
        Comments.saveComment(comment, id)
            .then(comments => {
                res.status(201).json(comments);
            })
            .catch(err => {
                res.status(500).json({ message: 'Error while trying to save the comment', err });
            });
    } else {
        res.status(400).json({ message: 'Missing data in the request body. Please make sure you have the fields of troll_username, comment_toxicity and comment.'})
    }
});


// /api/comments
router.delete('/', verifyId, (req, res) => {
    const { id } = req.body;

    Comments.deleteComment(id)
        .then(comments => {
            res.json(comments);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error while trying to delete the comment', err });
        });
});

module.exports = router;