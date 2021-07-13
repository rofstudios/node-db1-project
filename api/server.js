const express = require("express");
let accountsRoute = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRoute)

server.get('/', (req, res) => {
    res.status(200).json({ api: 'is up' })
})

module.exports = server;
