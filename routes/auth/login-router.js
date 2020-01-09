const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');
const verifyBody = require('./verifyBody.js');

const genToken = require('../genToken.js');

// no need to add /login - that is already being when we call router.use() in apiRouter
router.post('/', (req, res) => {
   let { username, password } = req.body;

   if(username && password) {
    Users.findBy({username})
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user);
            res.status(200).json({
                user: {
                    id: user.id,
                    username: user.username
                },
                token
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials, please check the username and password.' })
        };
    })
    .catch(err => {
        res.status(500).json({
            message: 'There was an error while trying to log the user in',
            error: err
        });
    });
   } else {
       res.status(400).json({ message: 'Missing username or password in body request.'})
   }
   

})

module.exports = router;