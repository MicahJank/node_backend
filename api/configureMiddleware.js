// rather than do all this inside the server.js file i have set this up so all the middleware can be imported into this file and used
// the result is then exported into the server file
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


module.exports = server => {
    server.use(helmet());
    server.use(express.json());
    server.use(cors());
}