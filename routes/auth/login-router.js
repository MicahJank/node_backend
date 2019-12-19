const router = require('express').Router();
const bcrypt = require('bcryptjs');

const genToken = require('../genToken.js');

// no need to add /login - that is already being when we call router.use() in apiRouter
router.post('/', (req, res) => {
    // build out login router

})

module.exports = router;