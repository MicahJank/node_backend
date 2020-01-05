const router = require('express').Router();

// middleware
const checkAuth = require('../routes/auth/checkAuth.js');
const verifyId = require('./verifyId.js');

// import routers
const loginRouter = require('../routes/auth/login-router.js');
const registerRouter = require('../routes/auth/register-router.js');
const usersRouter = require('../routes/users/users-router.js');
const commentsRouter = require('../routes/comments/comments-router.js');

// so to use the register and login router we need to access /api first
// ie - /api/register - /api/login
router.use('/register', registerRouter);
router.use('/login', loginRouter);

// only authenticated users should be able to access these routes
// verify id is used because it is possible for a user to have been deleted from the database and yet still have a valid token
// in such cases the verify id will not let those users access routes.
router.use('/users', checkAuth, verifyId, usersRouter);
router.use('/comments', checkAuth, verifyId, commentsRouter);

router.get('/', (req, res) => {
    res.send('<h1>Api is up and running</h1>');
});

module.exports = router;