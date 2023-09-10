const express = require('express');
const authenticate = require('./authenticate');


const applyMiddleware = (app) => {
    app.use(express.json());
    app.use(authenticate);
}

module.exports = applyMiddleware;