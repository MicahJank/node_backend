const Comments = require('./comments-model.js');

// Verifies that the comment ID is correct - without this a user could potentially delete other users comments, not what we want.
module.exports = (req, res, next) => {
    const { id } = req.body;

    Comments.findById(id)
        .then(comment => {
        comment ? next() : res.status(404).json({ message: `Comment with id: ${id} either doesn't exist in the database, or doesn't belong to the user.` });
        })
        .catch(err => {
            res.status(500).json({ message: `Error occurred`, err });
        })
}