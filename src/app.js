const express = require('express');

// express app
const app = express();

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