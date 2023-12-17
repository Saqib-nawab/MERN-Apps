// Importing the Mongoose library
const mongoose = require('mongoose');

// Defining the MongoDB URI where the database is hosted
const mongoURI = "mongodb://localhost:27017/saqib";

// Function to connect to MongoDB
const connectToMongo = () => {
    // Using Mongoose to connect to the MongoDB instance using the defined URI
    mongoose.connect(mongoURI);
    
    // Logging a message to the console indicating successful connection
    console.log("Connected to MongoDB");
}

// Exporting the connectToMongo function to be used in other files
module.exports = connectToMongo;
