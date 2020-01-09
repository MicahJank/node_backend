const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const verifyBody = require('./verifyBody.js');

const genToken = require('../genToken.js');

// no need to add /register - that is already being used when we call router.use() in apiRouter
router.post('/', verifyBody, (req, res) => {
   const user = req.body;

   const hash = bcrypt.hashSync(user.password, 6);
   user.password = hash;

   Users.addUser(user)
        .then(createdUser => {
            const token = genToken(createdUser);

            res.status(201).json({ created_user: createdUser, token });
        })
        .catch(err => {
            res.status(500).json({ message: 'An error occured while trying to register the user.', error: err });
        });

});


module.exports = router;