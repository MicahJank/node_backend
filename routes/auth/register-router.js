const router = require('express').Router();
const bcrypt = require('bcryptjs');

const genToken = require('../genToken.js');

// no need to add /register - that is already being when we call router.use() in apiRouter
router.post('/', (req, res) => {
    // build out register router

})


module.exports = router;