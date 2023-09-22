require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db');

const server = http.createServer(app);

const port = process.env.PORT || 4000;
const main = async () => {
    try {
        await connectDB()
        .then(() => {
            server.listen(port, () => {
                console.log(`Server is listening on port ${port}`)
            });
        })
    } catch(err) {
		console.log(err);
    }
}

main();