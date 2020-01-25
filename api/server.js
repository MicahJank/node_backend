const express = require('express');

// import express-graphql
const graphqlHTTP = require('express-graphql');
const schema = require('./schema.js'); //<-- where the magic is happening

const configureMiddleware = require('./configureMiddleware.js');

const apiRouter = require('./apiRouter.js');

const server = express();

// normal server.use(middleware)'s has been refactored out into its own file - configureMiddleware -
configureMiddleware(server);

// this is the route that will use graphql to get all our data schema will be defined in a separate file which we can import above
server.use('/graphql', graphqlHTTP({
    schema, // remember - this is shorthand for schema: schema
    graphiql: true
}));


// no need for the router anymore because everything will be done through the single endpoint graphql
// server.use('/api', apiRouter);

// Okay to still have this route so those who access the api can know its up and running
server.get('/', (req, res) => {
    res.send('<h1>Welcome to the Hacker-News-Api Backend!</h1>');
});

module.exports = server;
