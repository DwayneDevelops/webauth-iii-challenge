const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const sessionConfig = {
    name: 'weezybaby',
    secret: 'is it the juice?',
    cookie: {
        maxAge: 1000 * 30 * 20,
        secure: false,
        httpOnly: true,
    },
    saveUninitialized: true,
    resave: false,
    store: new KnexSessionStore({
        knex: require('../database/dbConfig'),
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 60,
    }),
}

server.use(helmet(), express.json(), cors(), session(sessionConfig));

server.get('/', (req, res) => {
    res.send("I'm booted up!");
});

module.exports = server;