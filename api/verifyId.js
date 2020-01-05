const Users = require('../routes/users/users-model.js');

// Verifies that the USER id is correct
module.exports = (req, res, next) => {
    const { id } = req.decodedJwt;

    Users.findById(id)
        .then(user => {
        user ? next() : res.status(404).json({ message: `User with id: ${id} doesn't exist in the database.` });
        })
        .catch(err => {
            res.status(500).json({ message: `Error occurred`, err });
        })
}