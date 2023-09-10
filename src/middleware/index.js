const express = require('express');
const morgan = require('morgan')


const applyMiddleware = (app) => {
    app.use(morgan())
    app.use(express.json());
}

module.exports = applyMiddleware;