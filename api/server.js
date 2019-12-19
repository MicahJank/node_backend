const express = require('express');

const configureMiddleware = require('./configureMiddleware.js');

const apiRouter = require('./apiRouter.js');

const server = express();

// normal server.use(middleware)'s has been refactored out into its own file - configureMiddleware -
configureMiddleware(server);


server.use('/api', apiRouter);


module.exports = server;
