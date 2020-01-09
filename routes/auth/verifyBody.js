const Users = require('../users/users-model.js');

module.exports = (req, res, next) => {
    const { username, password } = req.body;

    if(username && password) {
        Users.findBy({ username })
            .then(user => {
                res.status(400).json({ message: `A user with the username ${user.username} already exists, please pick a different username` })
            })
            .catch(() => {
                next();
            })
    } else {
        res.status(400).json({ message: 'Missing body data, please make sure you are registering with a username and a password in the request body.'})
    }
}