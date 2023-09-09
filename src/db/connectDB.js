const mongoose = require("mongoose");

let connectionURL = process.env.connectionURL;

const connectDB = async () => {
    await mongoose.connect(connectionURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
      console.log("Database Connected!!");
    })
    .catch((err) => console.log("Database Connection Error!!", err))
};

module.exports = connectDB;