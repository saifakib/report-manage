// Importing necessary modules and dependencies
const express = require('express');
const applyMiddleware = require('./middleware'); // Importing custom middleware
const routes = require('./routes'); // Importing application routes

// Creating an Express application
const app = express();

// Applying custom middleware to the Express app
applyMiddleware(app);

// Adding application routes to the Express app
app.use(routes);

// Default route for handling requests at the root ("/") of the server
app.use("/", (req, res) => {
    res.status(200).json({
        message: 'OK',
    });
});

// Error handling middleware to handle errors and format error responses
app.use((err, _req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        errors: err.errors,
    });
});

module.exports = app;