const express = require('express');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerDoc = YAML.load('./swagger.yaml');
const morgan = require('morgan')


const applyMiddleware = (app) => {
    app.use(morgan())
    app.use(express.json());
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
}

module.exports = applyMiddleware;