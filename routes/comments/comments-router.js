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
router.post('/:id', (req, res) => {
    const comment = req.body;
    const { id } = req.decodedJwt;
    Comments.saveComment(comment, id)
        .then(comments => {
            res.status(201).json(comments);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error while trying to save the comment', err });
        });
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