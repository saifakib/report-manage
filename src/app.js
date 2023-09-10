const express = require('express');
const applyMiddleware = require('./middleware');
const routes = require('./routes');

// express app
const app = express();
applyMiddleware(app);
app.use(routes);

app.use("/", (req, res) => {
    res.status(200).json({
		message: 'OK',
	});
}) 

app.use((err, _req, res, next) => {
    // format error
    res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
})

module.exports = app;