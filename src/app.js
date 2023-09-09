const express = require('express');
const routes = require('./routes');

// express app
const app = express();

// Add this line to parse JSON request bodies
app.use(express.json());


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