const Comments = require('./comments-model.js');

// Verifies that the comment ID is correct - without this a user could potentially delete other users comments, not what we want.
module.exports = (req, res, next) => {
    const usersId  = req.decodedJwt.id
    const commentId = req.body.id;

    Comments.findById(commentId, usersId)
        .then(() => {
            next();
        })
        .catch(err => {
            res.status(404).json({ message: `${err} Either the comment doesnt exist in the database or the comment you are trying to delete belongs to a different user.`  });
        })
}