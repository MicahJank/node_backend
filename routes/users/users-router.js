const router = require('express').Router();

const Users = require('./users-model.js');

const checkAuth = require('../auth/checkAuth.js');

const verifyBody = require('./verifyBody-middleware.js');


// /api/users
// returns a list of all users registered
router.get('/', (req, res) => {

    Users.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred while trying to get the users from the database', error: err });
        });
});

// /api/users
// updates username
router.put('/', verifyBody, (req, res) => {
    // the id of the currently logged in user
    const { id } = req.decodedJwt;

    // the new username the user wants
    const newUsername = req.body.username;

    Users.updateUsername(id, {username: newUsername})
        .then(updatedUser => {
            res.json(updatedUser);
        })
        .catch(err => {
            res.status(500).json({ message: 'There was an error while trying to update the username', error: err });
        });
});

// /api/users
// deletes the user from the database
router.delete('/', (req, res) => {
    const { id } = req.decodedJwt;

    Users.removeUser(id)
        .then(users => {
            res.json({
                message: 'User has been deleted successfully.',
                users
            })
        })
        .catch(err => {
            res.status(500).json({ 
                message: 'There was an error while trying to delete the user from the database.',
                error: err
            });
        });
});

module.exports = router;