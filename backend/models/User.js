// Importing the Mongoose library and specifically the Schema object from it
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Creating a schema for the user model with defined fields and their characteristics
const userSchema = new Schema({
    name: {
        type: 'string', // Field type: string
        required: true // Field is required
    },
    email: {
        type: 'string', // Field type: string
        required: true, // Field is required
        unique: true // Field must be unique
    },
    password: {
        type: 'string', // Field type: string
        required: true, // Field is required
        // unique: true // Field must be unique
    }
});

// Creating a Mongoose model named 'User' based on the userSchema
const User = mongoose.model('user', userSchema);

// Creating indexes for the unique fields in the schema (email and password)
// User.createIndexes();

// Exporting the User model to be used in other parts of the application
module.exports = User;
