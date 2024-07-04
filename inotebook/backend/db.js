// Importing the Mongoose library
const mongoose = require('mongoose');
require('dotenv').config();


// Defining the MongoDB Atlas URI where the database is hosted
const mongoURI = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectToMongo = async () => {
    try {
        // Using Mongoose to connect to the MongoDB Atlas instance using the defined URI
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // Logging a message to the console indicating successful connection
        console.log("Connected to MongoDB Atlas");
    } catch (error) {
        // Log error if connection fails
        console.error("Error connecting to MongoDB Atlas:", error.message);
        process.exit(1); // Exit process with failure
    }
}

// Exporting the connectToMongo function to be used in other files
module.exports = connectToMongo;
