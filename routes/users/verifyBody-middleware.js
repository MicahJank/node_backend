const Users = require('./users-model.js');

// Verifies that the USER id is correct
module.exports = (req, res, next) => {
    const { username } = req.body;

    if(username) {
        Users.findBy({ username })
            .then(user => {
                res.status(400).json({ message: `A user with the username ${user.username} already exists, please pick a different username` })
            })
            .catch(() => {
                next();
            })
    } else {
        res.status(400).json({ message: 'Missing body data, please make sure you are passing a username in the request body.'})
    }
}