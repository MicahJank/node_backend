const express = require('express');

const configureMiddleware = require('./configureMiddleware.js');

const apiRouter = require('./apiRouter.js');

const server = express();

// normal server.use(middleware)'s has been refactored out into its own file - configureMiddleware -
configureMiddleware(server);


server.use('/api', apiRouter);

router.get('/', (req, res) => {
    res.send('<h1>Welcome to the Hacker-News-Api Backend!</h1>');
});


module.exports = server;
