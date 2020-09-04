// IMPORTS
const express = require('express');
const helmet = require('helmet');
const projectsRouter = require('./projectsRouter.js');
const actionsRouter = require('./actionsRouter.js');

// SERVER
const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(logger);

// ROUTERS
server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`
    <h2>Server up </h2>
  `);
})

// GLOBAL MIDDLEWARE FUNCTIONS
function logger(req, res, next) {
console.log(`Request: ${req.method} | To: ${req.url}`);
next()
}

module.exports = server;