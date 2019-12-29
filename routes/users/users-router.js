const router = require('express').Router();

const Users = require('./users-model.js');

const checkAuth = require('../auth/checkAuth.js');


// /api/users
router.get('/', (req, res) => {

    Users.find()
        .then(users => {
        console.log("TCL: users", users)
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occurred while trying to get the users from the database', error: err });
        });
});


module.exports = router;