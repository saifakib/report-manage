const mongoose = require("mongoose"); 

let connectionURL = process.env.connectionURL;

// Function to establish a connection to the database
const connectDB = async () => {
    try {
        // Attempting to connect to the database using Mongoose
        await mongoose.connect(connectionURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        // If the connection is successful, log a success message
        console.log("Database Connected!!");
    } catch (err) {
        console.log("Database Connection Error!!", err);
    }
};

module.exports = connectDB;
